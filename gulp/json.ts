import * as path from 'path'
import { readFile, writeFile, Path } from 'jsonfile'

const appPath = 'app'
const appJson: Path = path.join(__dirname, `../${appPath}/app.json`)

export const readAppJson = async () => {
  console.log('appJson: ', appJson)
  const result = await readFile(appJson)
  return result
}

export const writeAppJson = (result: object) => {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
}
