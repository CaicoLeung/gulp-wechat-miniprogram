import { imagesCopy, jsCopy, jsonCopy, miniprogramSourceCopy, projectconfigCopy, wxmlCopy, wxsCopy, wxssCopy } from './gulp/Copy'
import { imgFiles, jsFiles, jsonFiles, miniprogramSource, projectconfig, sassFiles, tsFiles, wxmlFiles, wxsFiles, wxssFiles } from './gulp/SourcePath'
import child_process from 'child_process'
import { cleanDistDir } from './gulp/Clean'
import colors from 'colors'
import { create } from './gulp/ArgsHandle'
import fs from 'fs'
import gulp from 'gulp'
import { initProjectConfig } from './gulp/InitProjectConfig'
import { sassParser } from './gulp/Sass'
import { tsParser } from './gulp/Typescript'

// const postcss      = require('gulp-postcss');
// const cssnano      = require('cssnano');
// const concat       = require('gulp-concat');
// const uglify       = require('gulp-uglify');

async function install_npm() {
  const cmd = 'cd app/miniprogram && npm install'
  try {
    await fs.accessSync('app/miniprogram/package.json')
  } catch (err) {
    console.log(colors.red('miniprogram不存在package.json, 自动创建...'))
    await child_process.execSync('cd app/miniprogram && npm init -y')
  }
  // 使用npm安装依赖
  try {
    await child_process.execSync(cmd)
    console.log(colors.green('install_npm完成'))
  } catch (err) {
    console.log(colors.red(err.stack))
  }
}

gulp.task(cleanDistDir)
gulp.task(projectconfigCopy)
gulp.task(miniprogramSourceCopy)
gulp.task(jsCopy)
gulp.task(wxssCopy)
gulp.task(wxmlCopy)
gulp.task(wxsCopy)
gulp.task(jsonCopy)
gulp.task(imagesCopy)
gulp.task(tsParser)
gulp.task(sassParser)
gulp.task(create)
gulp.task(install_npm)
gulp.task(initProjectConfig)

// parallel
gulp.task(
  'build',
  gulp.series(
    'cleanDistDir',
    gulp.parallel('projectconfigCopy', 'miniprogramSourceCopy', 'jsCopy', 'wxssCopy', 'wxmlCopy', 'wxsCopy', 'jsonCopy', 'imagesCopy', 'tsParser', 'sassParser'),
    'initProjectConfig',
    'install_npm'
  )
)

// watch
gulp.task('watch', () => {
  gulp.watch(imgFiles, { alwaysStat: true }, imagesCopy)
  gulp.watch(wxssFiles, { alwaysStat: true }, wxssCopy)
  gulp.watch(jsFiles, { alwaysStat: true }, jsCopy)
  gulp.watch(wxsFiles, { alwaysStat: true }, wxsCopy)
  gulp.watch(jsonFiles, { alwaysStat: true }, jsonCopy)
  gulp.watch(wxmlFiles, { alwaysStat: true }, wxmlCopy)
  gulp.watch(tsFiles, { alwaysStat: true }, tsParser)
  gulp.watch(sassFiles, { alwaysStat: true }, sassParser)
  gulp.watch(miniprogramSource, { alwaysStat: true }, miniprogramSourceCopy)
  gulp.watch(projectconfig, { alwaysStat: true }, projectconfigCopy)
})

gulp.task('start', gulp.series('build', 'watch'))
