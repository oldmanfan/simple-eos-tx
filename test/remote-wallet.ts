import EOSContract from "../src";
import { RemoteSignatureProvider } from "../src/RemoteSignatureProvider";

const actor = 'horsemangosc';
const privateKey = '5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W';

const entryPoint = 'https://jungle3.cryptolions.io:443';
const contract = 'horsemangosc';

let signatureProvider = new RemoteSignatureProvider("http://127.0.0.1:8900");

(async function main() {
  const horserace = await EOSContract.from(contract).by(actor).at(entryPoint, signatureProvider).init();

  // console.log(JSON.stringify(await horserace.allActions()));
  // console.log(JSON.stringify(await horserace.allTables()));

  let r = await horserace.cleanrace();

  console.log(JSON.stringify(r.transaction_id, null, 2));
})();