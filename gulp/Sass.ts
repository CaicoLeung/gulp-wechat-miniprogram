import gulp from 'gulp'
import rename from 'gulp-rename'
import sassParse = require('gulp-sass')
import sourcemaps = require('gulp-sourcemaps')
import { sassFiles } from './SourcePath'

const gulpStylelint  = require('gulp-stylelint')

const sassParser = () => {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sassParse({
      errLogToConsole: true,
      sync: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulpStylelint({
      debug: true,
      fix: false,
      failAfterError: false,
      reporters: [
        {formatter: 'verbose', console: true}
      ]
    }))
    .pipe(rename({
      extname: '.wxss'
    }))
}

exports.sassParser = sassParser
