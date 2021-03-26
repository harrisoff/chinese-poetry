const fs = require('fs');
const beautify = require("json-beautify");

async function getFileJson(filePath) {
  const rawText = await fs.readFileSync(filePath);
  return JSON.parse(rawText);
}

function beautifyJson(oldJson) {
  return beautify(oldJson, null, 2)
}

module.exports = {
  getFileJson,
  beautifyJson
}
