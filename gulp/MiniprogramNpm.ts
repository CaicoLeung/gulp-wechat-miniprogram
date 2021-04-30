import child_process from 'child_process'
import colors from 'colors'
import fs from 'fs'

// 读取参数
const argvs = process.argv.slice(2)

if (!argvs.length) {
  throw Error('参数不能为空')
}

// 检查miniprogram是存在package.json, 若无则执行一次'npm init -y'生成
try {
  fs.accessSync('app/miniprogram/package.json')
} catch (err) {
  console.log(colors.bgRed('miniprogram不存在package.json, 自动创建...'))
  child_process.execSync('cd app/miniprogram && npm init -y')
}

const cmd = `cd app/miniprogram && npm install -S --production ${argvs.join(' ')}`

// 使用npm安装依赖
try {
  child_process.execSync(cmd)
  if (argvs.length) {
    console.log(colors.blue(`${argvs.join(' ')}构建完成, 请完成余下步骤`))
  }
} catch (err) {
  console.log(colors.red(err.stack))
}
