import * as gulp from 'gulp'
const { sassParser } = require('./gulp/Sass')
const { cleanDistDir } = require('./gulp/Clean')
const { imagesCopy, jsCopy, jsonCopy, wxmlCopy, wxsCopy, wxssCopy } = require('./gulp/Copy')
import { imgFiles, jsFiles, jsonFiles, sassFiles, tsFiles, wxsFiles, wxssFiles, wxmlFiles } from './gulp/SourcePath'
const { tsParser } = require('./gulp/Typescript')
const { argsHandle } = require('./gulp/ArgsHandle')

// const postcss      = require('gulp-postcss');
// const cssnano      = require('cssnano');
// const concat       = require('gulp-concat');
// const uglify       = require('gulp-uglify');

gulp.task(cleanDistDir)
gulp.task(jsCopy)
gulp.task(wxssCopy)
gulp.task(wxmlCopy)
gulp.task(wxsCopy)
gulp.task(jsonCopy)
gulp.task(imagesCopy)
gulp.task(tsParser)
gulp.task(sassParser)
gulp.task(argsHandle)

// parallel
gulp.task(
  'build',
  gulp.series('cleanDistDir', gulp.parallel('jsCopy', 'wxssCopy', 'wxmlCopy', 'wxsCopy', 'jsonCopy', 'imagesCopy', 'tsParser', 'sassParser'))
)

// watch
gulp.task('watch', () => {
  gulp.watch(imgFiles, imagesCopy)
  gulp.watch(wxssFiles, wxssCopy)
  gulp.watch(jsFiles, jsCopy)
  gulp.watch(wxsFiles, wxsCopy)
  gulp.watch(jsonFiles, jsCopy)
  gulp.watch(wxmlFiles, wxmlCopy)
  gulp.watch(tsFiles, tsParser)
  gulp.watch(sassFiles, sassParser)
})
