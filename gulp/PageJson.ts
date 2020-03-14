import path from 'path'
import { Path, readFile, writeFile } from 'jsonfile'

const appPath = 'app'
const appJson: Path = path.join(__dirname, `../${appPath}/app.json`)

export const readAppJson = async () => {
  console.log('appJson: ', appJson)
  return await readFile(appJson)
}

export const writeAppJson = (result: object) => {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
}
