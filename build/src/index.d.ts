import { Api } from 'eosjs';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
export default class EOSContract {
    [fn: string]: any;
    private contract_;
    private actor_;
    private pk_;
    private rpc_;
    private api_;
    private signatureProvider_;
    private actions_;
    private tables_;
    private constructor();
    get api(): Api | null;
    private getStruct;
    private genHelpActionInfo;
    private addAction;
    private query;
    init(): Promise<EOSContract>;
    static from(contr: string): EOSContract;
    by(actor: string, pk?: string | null): EOSContract;
    at(rpc: string, signatureProvider?: SignatureProvider | null): EOSContract;
    allActions(): string[];
    allTables(): string[];
}
