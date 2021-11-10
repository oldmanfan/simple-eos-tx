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
const src_1 = __importDefault(require("../src"));
const actor = 'horsemangosc';
const privateKey = '5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W';
const entryPoint = 'https://wax.cryptolions.io';
const contract = 'farmersworld';
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const fw = yield src_1.default.from(contract).by(actor, privateKey).at(entryPoint).init();
        // await fw.repair('horse', 100);
        let t = yield fw.tables.config();
        let a = yield fw.tables.accounts("..sg2.wam", "..sg2.wam");
        console.log(JSON.stringify(t, null, 2));
        console.log(JSON.stringify(a, null, 2));
    });
})();
//# sourceMappingURL=waxp.js.map