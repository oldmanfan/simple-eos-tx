import EOSContract from "../src";

const actor = 'horsemangosc';
const privateKey = '5JmF11umRgV2KFqzB3HXaiCpvUGSRAa2ipxmckQ19WMJ1cAUg8W';

const entryPoint = 'https://wax.cryptolions.io';
const contract = 'farmersworld';

(async function main() {
  const fw = await EOSContract.from(contract).by(actor, privateKey).at(entryPoint).init();

  // await fw.repair('horse', 100);
  let t = await fw.tables.config();
  let a = await fw.tables.accounts("..sg2.wam", "..sg2.wam");

  console.log(JSON.stringify(t, null, 2));
  console.log(JSON.stringify(a, null, 2));
})();



