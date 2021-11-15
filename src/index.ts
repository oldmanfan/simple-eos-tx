import { Api, JsonRpc} from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'cross-fetch';
import { Abi } from 'eosjs/dist/eosjs-rpc-interfaces';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';

interface Struct {
  name: string;
  base: string;
  fields: {
    name: string;
    type: string;
  }[];
}

interface Action {
  name: string;
  type: string;
  ricardian_contract: string;
}

interface Types {
  new_type_name: string;
  type: string;
}

type TableKey = string | null;

export default class EOSContract {
  [fn: string]: any;

  private contract_: string;
  private actor_: string | null = null;
  private pk_: string | null = null;
  private rpc_: string | null = null;
  private api_: Api | null = null;
  private signatureProvider_: SignatureProvider | null = null;

  private actions_: string[] = [];
  private tables_: string[] = [];

  private constructor(contr: string) {
    this.contract_ = contr;
  }

  get api() {
    return this.api_;
  }

  private getStruct(abi: Abi, key: string): Struct | null {
    for (const s of abi.structs) {
      if (s.name === key) return s as Struct;
    }
    return null;
  }

  private genHelpActionInfo(action: Action, struct: Struct | null) {
    let sig = "";
    if (struct) {
      for (const s of struct.fields) {
        sig += `${s.name}: ${s.type},`
      }
    }
    this.actions_.push(`function ${action.name}(${sig})`);
  }

  private addAction(action: Action, struct: Struct | null) {
    this.genHelpActionInfo(action, struct);
    const actionName = action.name;

    this[actionName] = async (...args: any) => {

      let data: { [key: string]: any } = {};
      if (struct) {
        for (let i = 0; i < struct.fields.length; i++) {
          data[struct.fields[i].name] = args[i];
        }
      }

      const result = await this.api!.transact({
        actions: [{
          account: this.contract_,
          name: actionName,
          authorization: [{
            actor: this.actor_!,
            permission: 'active',
          }],
          data,
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      }
      );

      return result;
    }
  }

  private async query(table: string, lower_bound: TableKey = null, upper_bound: TableKey = null, key_type: TableKey = "i64", scope: TableKey = null) {
    const filter = {
      json: true,
      code: this.contract_,
      scope: scope ? scope : this.contract_,
      table,
      lower_bound,
      upper_bound,
      key_type,
      limit: "100",
      reverse: false,
      show_payer: false,
    };

    return await this.api!.rpc.get_table_rows(filter);
  }

  async init(): Promise<EOSContract> {
    const rpc = new JsonRpc(this.rpc_!, { fetch });
    this.api_ = new Api({ rpc, signatureProvider: this.signatureProvider_!, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const abi = await this.api!.getAbi(this.contract_);

    for (const a of abi.actions) {
      const s = this.getStruct(abi, a.type);
      this.addAction(a, s);
    }

    this['tables'] = {};
    for (const t of abi.tables) {
      this['tables'][t.name] = async (lower_bound: TableKey = null, upper_bound: TableKey = null, scope: TableKey = null) => {
        return this.query(t.name, lower_bound, upper_bound, t.index_type, scope);
      }
      this.tables_.push(t.name);
    }

    return this;
  }

  static from(contr: string): EOSContract {
    let c = new EOSContract(contr);
    return c;
  }

  by(actor: string, pk: string | null = null): EOSContract {
    this.actor_ = actor;
    this.pk_ = pk;

    return this;
  }

  at(rpc: string, signatureProvider: SignatureProvider | null = null): EOSContract {
    this.rpc_ = rpc;
    if (signatureProvider) {
      this.signatureProvider_ = signatureProvider;
    } else {
      this.signatureProvider_ = new JsSignatureProvider([this.pk_!]);
    }
    return this;
  }

  allActions() {
    return this.actions_;
  }

  allTables() {
    return this.tables_;
  }

}