export default class EOSHttpWallet {
    private walletUrl;
    constructor(url: string);
    createWallet(walletName: string): Promise<void>;
    createKey(walletName: string, keyType?: 'k1' | 'r1'): Promise<string>;
    getPublicKeys(): Promise<string[]>;
    importKey(walletName: string, privateKey: string): Promise<void>;
    listKeys(walletName: string, password: string): Promise<any>;
    listWallets(): Promise<string[]>;
    lock(walletName: string): Promise<void>;
    unlock(walletName: string, password: string): Promise<void>;
    signDigest(digest: string, requiredKey: string): Promise<string>;
    setTimeout(seconds: number): Promise<void>;
    removeKey(walletName: string, password: string, pubKey: string): Promise<void>;
}
