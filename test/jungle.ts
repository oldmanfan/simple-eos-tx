import EOSContract from "../src";

const actor = 'horsemangosc';
const privateKey = '5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W';

const entryPoint = 'https://jungle3.cryptolions.io:443';
const contract = 'horsemangosc';

(async function main() {
  const horserace = new EOSContract(contract, actor, privateKey, entryPoint);
  await horserace.init();

  console.log(JSON.stringify(await horserace.allActions()));
  console.log(JSON.stringify(await horserace.allTables()));

  let r = await horserace.cleanrace();

  console.log(JSON.stringify(r, null, 2));
})();



