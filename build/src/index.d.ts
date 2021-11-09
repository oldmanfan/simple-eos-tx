import { Api } from 'eosjs';
export default class EOSContract {
    [fn: string]: any;
    private contract_;
    private actor_;
    private api_;
    private actions_;
    private tables_;
    constructor(contr: string, actor: string, pk: string, url: string);
    get api(): Api;
    private getStruct;
    private genHelpActionInfo;
    private addAction;
    private query;
    init(): Promise<void>;
    allActions(): string[];
    allTables(): string[];
}
