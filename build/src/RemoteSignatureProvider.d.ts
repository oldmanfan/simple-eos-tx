import { SignatureProvider, SignatureProviderArgs } from "eosjs/dist/eosjs-api-interfaces";
import { PushTransactionArgs } from "eosjs/dist/eosjs-rpc-interfaces";
export declare class RemoteSignatureProvider implements SignatureProvider {
    private eosWallet;
    constructor(walletUrl: string);
    getAvailableKeys(): Promise<string[]>;
    sign({ chainId, requiredKeys, serializedTransaction, serializedContextFreeData }: SignatureProviderArgs): Promise<PushTransactionArgs>;
}
