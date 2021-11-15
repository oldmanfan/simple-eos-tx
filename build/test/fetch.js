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
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let p = { digest: '123456789abcdef0', public_key_type: "EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA" };
        // let resp  = await fetch(`http://127.0.0.1:8900/v1/wallet/sign_digest`, {method: 'POST', body: '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]'});
        // let resp  = await fetch(`http://127.0.0.1:8900/v1/wallet/sign_digest`, {method: 'POST', body: JSON.stringify(p)});
        let resp = yield (0, cross_fetch_1.default)("http://127.0.0.1:8900/v1/wallet/sign_digest", {
            body: '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        });
        console.log(JSON.stringify(yield resp.json()));
    });
})();
//# sourceMappingURL=fetch.js.map