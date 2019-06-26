const fs      = require('fs');
const path    = require('path');
const appPath = 'app';
const appJson = path.join(__dirname, '..', appPath, 'app.json');

const readAppJson = () => {
  return JSON.parse(fs.readFileSync(appJson).toString());
};

const writeAppJson = (result) => {
  fs.writeFileSync(appJson, result);
};

module.exports = {
  readAppJson,
  writeAppJson
};
