const fs = require("fs");
const YAML = require("yaml");

try {
  const inputYMLPath = "./fab_tcg_data/data/set_cards/000_IRA/IRA001.yaml";
  const file = fs.readFileSync(inputYMLPath, "utf8");
  const json = YAML.parse(file);
  const reactAppOutputJSONPath = "./next/src/data/cards.json";
  fs.writeFileSync(reactAppOutputJSONPath, JSON.stringify(json, null, 2));
  console.log("Card data successfully imported to react app");
} catch (e) {
  console.log(e);
}
