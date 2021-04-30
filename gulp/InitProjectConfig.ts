import { readFile, writeFile } from 'jsonfile'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

export async function initProjectConfig() {
  if (!fs.existsSync('wx.config.yaml')) {
    return
  }

  const projectJson = path.join(__dirname, '../dist/project.config.json')
  const wxConfig = fs.readFileSync('wx.config.yaml', 'utf8')

  async function writeProjectConfig(config: Record<string, unknown>) {
    const jonsConfig = await readFile(projectJson)
    const result = _.merge(jonsConfig, config)
    writeFile(projectJson, result, { spaces: 2 }, (err: unknown) => {
      if (err) {
        console.error(err)
      }
      console.log('project.config.json 已配置')
    })
  }

  function readWxConfig(config: string) {
    return yaml.parse(config, { prettyErrors: true })
  }

  if (wxConfig) {
    const originConfig = readWxConfig(wxConfig)
    const finallyConfig = {
      appid: originConfig?.appid,
      projectname: originConfig?.projectname
    }
    writeProjectConfig(finallyConfig)
  }
}
