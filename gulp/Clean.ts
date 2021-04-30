import fs from 'fs'
import path from 'path'

export const cleanDistDir = async () => fs.rmSync(path.join(process.cwd(), 'dist'), { recursive: true })
