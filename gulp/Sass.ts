const gulpSass = require('gulp-sass')
import { distPath, sassFiles } from './SourcePath'
const gulpStylelint = require('gulp-stylelint')
import gulp from 'gulp'
import rename from 'gulp-rename'

gulpSass.compiler = require('node-sass')

const sassParser = () => {
  return gulp.src(sassFiles)
    .pipe(gulpSass({
      sourceMap: true,
      outputStyle: 'compressed'
    }).on('error', gulpSass.logError))
    .pipe(gulpStylelint({
      debug: true,
      fix: true,
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(distPath))
}

exports.sassParser = sassParser
