import * as path from 'path'
import { readFile, writeFile } from 'jsonfile'

const appPath = 'app'
const appJson = path.join(__dirname, `../${appPath}/app.json`)

export const readAppJson = async (): Promise<any> => {
  console.log('appJson: ', appJson)
  return await readFile(appJson)
  // return JSON.parse(readFileSync(appJson).toString())
}

export const writeAppJson = (result: object) => {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
  // fs.writeFileSync(appJson, result)
}
