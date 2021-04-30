import { readFile, writeFile } from 'jsonfile'
import path from 'path'

const appPath = 'app'
const appJson = path.join(__dirname, `../${appPath}/app.json`)

export const readAppJson = async () => {
  console.log('appJson: ', appJson)
  return readFile(appJson)
}

export const writeAppJson = (result: unknown) => {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
}
