import { Options } from 'gulp-autoprefixer'
import { readAppJson, writeAppJson } from './gulp/json'
import * as path from 'path'
import * as gulp from 'gulp'

// const babel        = require('gulp-babel');
import sassParse = require('gulp-sass')
import imagemin = require('gulp-imagemin')
// const postcss      = require('gulp-postcss');
// const cssnano      = require('cssnano');
import sourcemaps = require('gulp-sourcemaps')
import ts = require('gulp-typescript')
// const eslint       = require('gulp-eslint')
import autoprefixer = require('gulp-autoprefixer')
// const concat       = require('gulp-concat');
// const uglify       = require('gulp-uglify');
import rename = require('gulp-rename')
import del = require('del')
import colors = require('colors')
import yargs = require('yargs')

const appPath = 'app/**'
const whitelist: string[] = [`!${appPath}/_template/*`, `!${appPath}/_component/*`, `!${appPath}/vant/*`]
const distPath = 'dist'
const wxssFiles = [`${appPath}/*.wxss`]
const jsFiles = [`${appPath}/*.js`, `${appPath}/*.wxs`]
const wxmlFiles = [`${appPath}/*.wxml`, ...whitelist.map(s => s + '.wxml')]
const sassFiles = [`${appPath}/*.+(sass|scss)`, `!${appPath}/assets/css/*.+(sass|scss)`, ...whitelist.map(s => s + '.(sass|scss)')]
const jsonFiles = [`${appPath}/*.json`, ...whitelist.map(s => s + '.json')]
const tsFiles = [`${appPath}/*.ts`, `!${appPath}/_template/*ts`, `!${appPath}/_component/*ts`, `!${appPath}/*.d.ts`]
const imgFiles = [`${appPath}/assets/img/**/*.{png, jpg, gif, ico}`]
const tsProject = ts.createProject('tsconfig.json')
const root = path.join(__dirname, 'app/pages')
const componentPath = path.join(__dirname, 'app/components')
const _templateSource = `${appPath}/_template`
const _componentSource = `${appPath}/_component`

const clean = async () => {
  const deletePaths = await del('dist/**')
  console.log(colors.red('以下的文件和目录被删除:\n') + colors.yellow(deletePaths.join('\n')))
}
gulp.task(clean)

const js = () => {
  return gulp.src(jsFiles, { since: gulp.lastRun(js) })
    .pipe(gulp.dest(distPath))
}
gulp.task(js)

const wxss = () => {
  return gulp.src(wxssFiles, { since: gulp.lastRun(wxss) })
    .pipe(gulp.dest(distPath))
}
gulp.task(wxss)

const wxml = () => {
  return gulp.src(wxmlFiles, { since: gulp.lastRun(wxml) })
    .pipe(gulp.dest(distPath))
}
gulp.task(wxml)

const typescript = () => {
  return gulp.src(tsFiles, { since: gulp.lastRun(typescript) })
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on('error', (err: string) => { console.error(err) })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
}
gulp.task(typescript)

const json = () => {
  return gulp.src(jsonFiles, { since: gulp.lastRun(json) })
    .pipe(gulp.dest(distPath))
}
gulp.task(json)

const sass = () => {
  const autoprefixerOptions: Options = {
    browsers: ['last 2 versions'],
    cascade: true,
    remove: true
  }
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sassParse({ outputStyle: 'compressed' }).on('error', sassParse.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
}
gulp.task(sass)

const images = () => {
  return gulp.src(imgFiles, { since: gulp.lastRun(images) })
    .pipe(imagemin())
    .pipe(gulp.dest(distPath))
}
gulp.task(images)

// parallel
gulp.task('build', gulp.series('clean', gulp.parallel('images', 'wxss', 'js', 'wxml', 'typescript', 'json', 'sass')))

// watch
gulp.task('watch', () => {
  gulp.watch(imgFiles, images)
  gulp.watch(wxssFiles, wxss)
  gulp.watch(jsFiles, js)
  gulp.watch(sassFiles, sass)
  gulp.watch(tsFiles, typescript)
  gulp.watch(jsonFiles, json)
  gulp.watch(wxmlFiles, wxml)
})

const argv = yargs.argv
let target: string | unknown
let createPath = ''
let createTemplate = ''

const create = async () => {
  if (argv.page) {
    target = argv.page
    createTemplate = _templateSource
    createPath = root
    const appJson = await readAppJson()
    if (appJson.hasOwnProperty('pages')) {
      appJson.pages.push(`pages/${target}/index`)
      writeAppJson(appJson)
    }
  } else if (argv.component) {
    target = argv.component
    createTemplate = _componentSource
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
gulp.task(create)
