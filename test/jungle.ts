import EOSContract from "../src";

const actor = 'horsemangosc';
const privateKey = '5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W';

const entryPoint = 'https://jungle3.cryptolions.io:443';
const contract = 'horsemangosc';

(async function main() {
  const horserace = await EOSContract.from(contract).by(actor, privateKey).at(entryPoint).init();

  // console.log(JSON.stringify(await horserace.allActions()));
  // console.log(JSON.stringify(await horserace.allTables()));

  let r = await horserace.cleanrace();

  console.log(JSON.stringify(r.transaction_id, null, 2));
})();



