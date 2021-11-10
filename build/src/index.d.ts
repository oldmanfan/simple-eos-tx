import { Api } from 'eosjs';
export default class EOSContract {
    [fn: string]: any;
    private contract_;
    private actor_;
    private pk_;
    private rpc_;
    private api_;
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
    by(actor: string, pk: string): EOSContract;
    at(rpc: string): EOSContract;
    allActions(): string[];
    allTables(): string[];
}
