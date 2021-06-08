import fs from 'fs'
import path from 'path'

export const cleanDistDir = async () => {
  const distPath = path.join(process.cwd(), 'dist')
  try {
    const stat = fs.statSync(distPath)
    if (stat.isDirectory()) {
      fs.rmdirSync(distPath, { recursive: true })
    } else {
      fs.mkdirSync(distPath)
    }
  } catch (err) {
    console.error(err)
  }
}
