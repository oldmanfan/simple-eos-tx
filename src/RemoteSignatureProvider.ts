import { SignatureProvider, SignatureProviderArgs } from "eosjs/dist/eosjs-api-interfaces";
import { PushTransactionArgs } from "eosjs/dist/eosjs-rpc-interfaces";
import fetch from 'cross-fetch';
import { ec } from 'elliptic';
import EOSHttpWallet from "./EOSHttpWallet";

const defaultEc = new ec('secp256k1');

// Convert a byte array to a hex string
const bytesToHex = (bytes: number[]): string => {
  for (var hex = [], i = 0; i < bytes.length; i++) {
      var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
      hex.push((current >>> 4).toString(16));
      hex.push((current & 0xF).toString(16));
  }
  return hex.join("");
}

const digestFromSerializedData = (
    chainId: string,
    serializedTransaction: Uint8Array,
    serializedContextFreeData?: Uint8Array,
    e = defaultEc
  ): string => {
  const signBuf = Buffer.concat([
      Buffer.from(chainId, 'hex'),
      Buffer.from(serializedTransaction),
      Buffer.from(
          serializedContextFreeData ?
              new Uint8Array(e.hash().update(serializedContextFreeData).digest()) :
              new Uint8Array(32)
      ),
  ]);
  let digest = e.hash().update(signBuf).digest();
  return bytesToHex(digest);
};

export class RemoteSignatureProvider implements SignatureProvider {

  private eosWallet: EOSHttpWallet;

  constructor(walletUrl: string) {
    this.eosWallet = new EOSHttpWallet(walletUrl);
  }

  async getAvailableKeys(): Promise<string[]> {
    return await this.eosWallet.getPublicKeys();
  }

  async sign({chainId, requiredKeys, serializedTransaction, serializedContextFreeData }: SignatureProviderArgs): Promise<PushTransactionArgs> {
    const digest = digestFromSerializedData( chainId, serializedTransaction, serializedContextFreeData, defaultEc);

    let sig = await this.eosWallet.signDigest(digest, requiredKeys[0]);

    return {signatures: [sig], serializedTransaction, serializedContextFreeData};
  }

}