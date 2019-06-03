import * as fs from 'fs';
import * as path from 'path'
const appPath: string = 'app';
const appJson: string = path.join(__dirname, '..', appPath, 'app.json');

export const readAppJson = () => {
  return JSON.parse(fs.readFileSync(appJson).toString());
};

export const writeAppJson = (result: string) => {
  fs.writeFileSync(appJson, result);
}