import { componentPath, componentSource, rootPath, templateSource } from './SourcePath'
import { readAppJson, writeAppJson } from './PageJson'
import gulp from 'gulp'
import path from 'path'
import rename from 'gulp-rename'
import yargs from 'yargs'

const { argv } = yargs
let target: string | unknown
let createPath = ''
let createTemplate = ''

const create = async () => {
  if (argv.page) {
    target = argv.page
    createTemplate = templateSource
    createPath = rootPath
    const appJson = await readAppJson()
    if (appJson.pages) {
      appJson.pages.push(`pages/${target}/index`)
      writeAppJson(appJson)
    }
  } else if (argv.component) {
    target = argv.component
    createTemplate = componentSource
    createPath = componentPath
  }
  if (!target || !createPath) {
    throw Error('参数错误或文件名为空')
  }
  return gulp.src(path.join(createTemplate, '*.*'))
    .pipe(rename({
      dirname: target.toString(),
      basename: 'index'
    }))
    .pipe(gulp.dest(path.join(createPath)))
}

exports.create = create
