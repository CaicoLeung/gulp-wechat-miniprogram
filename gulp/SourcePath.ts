import path from 'path'

export const appPath = 'app/**'
export const whitelist: string[] = [`!${appPath}/_template/**/*`, `!${appPath}/_component/**/*`, `!${appPath}/modules/**/*`, `!${appPath}/services/**/*`, `!${appPath}/tsconfig.json`]
export const distPath = 'dist'
export const wxssFiles = [`${appPath}/*.wxss`, ...whitelist.map(s => `${s}.wxss`)]
export const jsFiles = [`${appPath}/*.js`, `${appPath}/*.wxs`]
export const wxmlFiles = [`${appPath}/*.wxml`, ...whitelist.map(s => `${s}.wxml`)]
export const sassFiles = [`${appPath}/*.+(sass|scss)`, ...whitelist.map(s => `${s}.+(sass|scss)`)]
export const jsonFiles = [`${appPath}/*.json`, ...whitelist.map(s => `${s}.json`)]
export const tsFiles = [`${appPath}/*.ts`, ...whitelist.map(s => `${s}.ts`), `!${appPath}/*.d.ts`]
export const imgFiles = [`${appPath}/assets/**/*.{png, jpg, gif, ico}`]
export const wxsFiles = [`${appPath}/modules/*.ts`]
export const rootPath = path.join(__dirname, '../app/pages')
export const componentPath = path.join(__dirname, '../app/components')
export const templateSource = path.join(__dirname, '../app/_template')
export const componentSource = path.join(__dirname, '../app/_component')
export const miniprogramSource = [`${appPath}/miniprogram/**/*`, ...whitelist]
export const projectconfig = ['project.config.json']
