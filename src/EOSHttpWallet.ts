
import fetch from 'cross-fetch';

export default class EOSHttpWallet {
  private walletUrl: string;

  constructor(url: string) {
    this.walletUrl = url;
  }

  // curl http://127.0.0.1:8900/v1/wallet/create -d '"ttt"'
  async createWallet(walletName: string) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/create`, {method: 'POST', body: walletName});

    if (!resp.ok) {
      throw new Error(`createWallet: ${resp.status}, ${resp.statusText}`);
    }
  }

  // curl http://127.0.0.1:8900/v1/wallet/create_key -d '["ttt","k1"]'
  async createKey(walletName: string, keyType: 'k1' | 'r1' = 'k1'): Promise<string> {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/create_key`, {method: 'POST', body: JSON.stringify([walletName, keyType])});

    if (!resp.ok) {
      throw new Error(`createKey: ${resp.status}, ${resp.statusText}`);
    }

    return await resp.json();
  }

  // curl http://127.0.0.1:8900/v1/wallet/get_public_keys
  async getPublicKeys(): Promise<string[]> {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/get_public_keys`);

    if (!resp.ok) {
      throw new Error(`getPublicKeys: ${resp.status}, ${resp.statusText}`);
    }

    return await resp.json();
  }

  // curl http://127.0.0.1:8900/v1/wallet/import_key -d '["ttt","5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W"]'
  async importKey(walletName: string, privateKey: string) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/import_key`, {method: 'POST', body: JSON.stringify([walletName, privateKey])});

    if (!resp.ok) {
      throw new Error(`importKey: ${resp.status}, ${resp.statusText}`);
    }
  }

  // curl http://127.0.0.1:8900/v1/wallet/list_keys -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX"]'
  async listKeys(walletName: string, password: string): Promise<any> {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/list_keys`, {method: 'POST', body: JSON.stringify([walletName, password])});

    if (!resp.ok) {
      throw new Error(`listKeys: ${resp.status}, ${resp.statusText}`);
    }

    return await resp.json();
  }

  // curl http://127.0.0.1:8900/v1/wallet/list_wallets
  async listWallets(): Promise<string[]> {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/list_wallets`, {method: 'POST'});

    if (!resp.ok) {
      throw new Error(`listWallets: ${resp.status}, ${resp.statusText}`);
    }

    return await resp.json();
  }

  // curl http://127.0.0.1:8900/v1/wallet/lock -d '"ttt"'
  async lock(walletName: string) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/lock`, {method: 'POST'});

    if (!resp.ok) {
      throw new Error(`lock: ${resp.status}, ${resp.statusText}`);
    }
  }

  // curl http://127.0.0.1:8900/v1/wallet/unlock -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX"]'
  async unlock(walletName: string, password: string) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/unlock`, {method: 'POST', body: JSON.stringify([walletName, password])});

    if (!resp.ok) {
      throw new Error(`unlock: ${resp.status}, ${resp.statusText}`);
    }
  }

  // curl -X POST http://127.0.0.1:8900/v1/wallet/sign_digest -d '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]'
  async signDigest(digest: string, requiredKey: string): Promise<string> {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/sign_digest`, {method: 'POST', body: JSON.stringify([digest, requiredKey])});

    if (!resp.ok) {
      throw new Error(`signDigest: ${resp.status}, ${resp.statusText}`);
    }

    return await resp.json();
  }

  // curl -X POST http://127.0.0.1:8900/v1/wallet/set_timeout -d '99999999'
  async setTimeout(seconds: number) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/set_timeout`, {method: 'POST', body: seconds.toString()});

    if (!resp.ok) {
      throw new Error(`setTimeout: ${resp.status}, ${resp.statusText}`);
    }
  }

  // curl -X POST http://127.0.0.1:8900/v1/wallet/remove_key -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX","EOS5mvnYRxBBVqf8BDXbh3FsCrTU9yjbxz8vtoMxQWgwmkzs5DQ2m"]'
  async removeKey(walletName: string, password: string, pubKey: string) {
    let resp  = await fetch(`${this.walletUrl}/v1/wallet/remove_key`, {method: 'POST', body: JSON.stringify([walletName, password, pubKey])});

    if (!resp.ok) {
      throw new Error(`removeKey: ${resp.status}, ${resp.statusText}`);
    }
  }
}