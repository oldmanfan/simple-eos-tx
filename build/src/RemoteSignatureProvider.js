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
exports.RemoteSignatureProvider = void 0;
const elliptic_1 = require("elliptic");
const EOSHttpWallet_1 = __importDefault(require("./EOSHttpWallet"));
const defaultEc = new elliptic_1.ec('secp256k1');
// Convert a byte array to a hex string
const bytesToHex = (bytes) => {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
};
const digestFromSerializedData = (chainId, serializedTransaction, serializedContextFreeData, e = defaultEc) => {
    const signBuf = Buffer.concat([
        Buffer.from(chainId, 'hex'),
        Buffer.from(serializedTransaction),
        Buffer.from(serializedContextFreeData ?
            new Uint8Array(e.hash().update(serializedContextFreeData).digest()) :
            new Uint8Array(32)),
    ]);
    let digest = e.hash().update(signBuf).digest();
    return bytesToHex(digest);
};
class RemoteSignatureProvider {
    constructor(walletUrl) {
        this.eosWallet = new EOSHttpWallet_1.default(walletUrl);
    }
    getAvailableKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eosWallet.getPublicKeys();
        });
    }
    sign({ chainId, requiredKeys, serializedTransaction, serializedContextFreeData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const digest = digestFromSerializedData(chainId, serializedTransaction, serializedContextFreeData, defaultEc);
            let sig = yield this.eosWallet.signDigest(digest, requiredKeys[0]);
            return { signatures: [sig], serializedTransaction, serializedContextFreeData };
        });
    }
}
exports.RemoteSignatureProvider = RemoteSignatureProvider;
//# sourceMappingURL=RemoteSignatureProvider.js.map