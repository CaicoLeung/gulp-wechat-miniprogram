import { readFile, writeFile } from 'jsonfile'
import path from 'path'

const appPath = 'app'
const appJson = path.join(__dirname, `../${appPath}/app.json`)

export const readAppJson = async () => {
  console.log('appJson: ', appJson)
  return await readFile(appJson)
}

export const writeAppJson = (result: object) => {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
}
