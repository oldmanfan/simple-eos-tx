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
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class EOSHttpWallet {
    constructor(url) {
        this.walletUrl = url;
    }
    // curl http://127.0.0.1:8900/v1/wallet/create -d '"ttt"'
    createWallet(walletName) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/create`, { method: 'POST', body: walletName });
            if (!resp.ok) {
                throw new Error(`createWallet: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/create_key -d '["ttt","k1"]'
    createKey(walletName, keyType = 'k1') {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/create_key`, { method: 'POST', body: JSON.stringify([walletName, keyType]) });
            if (!resp.ok) {
                throw new Error(`createKey: ${resp.status}, ${resp.statusText}`);
            }
            return yield resp.json();
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/get_public_keys
    getPublicKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/get_public_keys`);
            if (!resp.ok) {
                throw new Error(`getPublicKeys: ${resp.status}, ${resp.statusText}`);
            }
            return yield resp.json();
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/import_key -d '["ttt","5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W"]'
    importKey(walletName, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/import_key`, { method: 'POST', body: JSON.stringify([walletName, privateKey]) });
            if (!resp.ok) {
                throw new Error(`importKey: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/list_keys -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX"]'
    listKeys(walletName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/list_keys`, { method: 'POST', body: JSON.stringify([walletName, password]) });
            if (!resp.ok) {
                throw new Error(`listKeys: ${resp.status}, ${resp.statusText}`);
            }
            return yield resp.json();
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/list_wallets
    listWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/list_wallets`, { method: 'POST' });
            if (!resp.ok) {
                throw new Error(`listWallets: ${resp.status}, ${resp.statusText}`);
            }
            return yield resp.json();
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/lock -d '"ttt"'
    lock(walletName) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/lock`, { method: 'POST' });
            if (!resp.ok) {
                throw new Error(`lock: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
    // curl http://127.0.0.1:8900/v1/wallet/unlock -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX"]'
    unlock(walletName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/unlock`, { method: 'POST', body: JSON.stringify([walletName, password]) });
            if (!resp.ok) {
                throw new Error(`unlock: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
    // curl -X POST http://127.0.0.1:8900/v1/wallet/sign_digest -d '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]'
    signDigest(digest, requiredKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/sign_digest`, { method: 'POST', body: JSON.stringify([digest, requiredKey]) });
            if (!resp.ok) {
                throw new Error(`signDigest: ${resp.status}, ${resp.statusText}`);
            }
            return yield resp.json();
        });
    }
    // curl -X POST http://127.0.0.1:8900/v1/wallet/set_timeout -d '99999999'
    setTimeout(seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/set_timeout`, { method: 'POST', body: seconds.toString() });
            if (!resp.ok) {
                throw new Error(`setTimeout: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
    // curl -X POST http://127.0.0.1:8900/v1/wallet/remove_key -d '["ttt","PW5JRsgr3tpG3tgWeZ7hAFS9UmMdeQRoWeqsTKsX2CZ1Sk5Rq5hpX","EOS5mvnYRxBBVqf8BDXbh3FsCrTU9yjbxz8vtoMxQWgwmkzs5DQ2m"]'
    removeKey(walletName, password, pubKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield (0, cross_fetch_1.default)(`${this.walletUrl}/v1/wallet/remove_key`, { method: 'POST', body: JSON.stringify([walletName, password, pubKey]) });
            if (!resp.ok) {
                throw new Error(`removeKey: ${resp.status}, ${resp.statusText}`);
            }
        });
    }
}
exports.default = EOSHttpWallet;
//# sourceMappingURL=EOSHttpWallet.js.map