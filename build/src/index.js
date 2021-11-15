"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class EOSContract {
    constructor(contr) {
        this.actor_ = null;
        this.pk_ = null;
        this.rpc_ = null;
        this.api_ = null;
        this.signatureProvider_ = null;
        this.actions_ = [];
        this.tables_ = [];
        this.contract_ = contr;
    }
    get api() {
        return this.api_;
    }
    getStruct(abi, key) {
        for (const s of abi.structs) {
            if (s.name === key)
                return s;
        }
        return null;
    }
    genHelpActionInfo(action, struct) {
        let sig = "";
        if (struct) {
            for (const s of struct.fields) {
                sig += `${s.name}: ${s.type},`;
            }
        }
        this.actions_.push(`function ${action.name}(${sig})`);
    }
    addAction(action, struct) {
        this.genHelpActionInfo(action, struct);
        const actionName = action.name;
        this[actionName] = (...args) => __awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (struct) {
                for (let i = 0; i < struct.fields.length; i++) {
                    data[struct.fields[i].name] = args[i];
                }
            }
            const result = yield this.api.transact({
                actions: [{
                        account: this.contract_,
                        name: actionName,
                        authorization: [{
                                actor: this.actor_,
                                permission: 'active',
                            }],
                        data,
                    }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            return result;
        });
    }
    query(table, lower_bound = null, upper_bound = null, key_type = "i64", scope = null) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.api.rpc.get_table_rows(filter);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpc = new eosjs_1.JsonRpc(this.rpc_, { fetch: cross_fetch_1.default });
            this.api_ = new eosjs_1.Api({ rpc, signatureProvider: this.signatureProvider_, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
            const abi = yield this.api.getAbi(this.contract_);
            for (const a of abi.actions) {
                const s = this.getStruct(abi, a.type);
                this.addAction(a, s);
            }
            this['tables'] = {};
            for (const t of abi.tables) {
                this['tables'][t.name] = (lower_bound = null, upper_bound = null, scope = null) => __awaiter(this, void 0, void 0, function* () {
                    return this.query(t.name, lower_bound, upper_bound, t.index_type, scope);
                });
                this.tables_.push(t.name);
            }
            return this;
        });
    }
    static from(contr) {
        let c = new EOSContract(contr);
        return c;
    }
    by(actor, pk = null) {
        this.actor_ = actor;
        this.pk_ = pk;
        return this;
    }
    at(rpc, signatureProvider = null) {
        this.rpc_ = rpc;
        if (signatureProvider) {
            this.signatureProvider_ = signatureProvider;
        }
        else {
            this.signatureProvider_ = new eosjs_jssig_1.JsSignatureProvider([this.pk_]);
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
exports.default = EOSContract;
//# sourceMappingURL=index.js.map