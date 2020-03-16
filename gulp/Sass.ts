import { distPath, sassFiles } from './SourcePath'
import gulp from 'gulp'
import rename from 'gulp-rename'
const gulpSass = require('gulp-sass')
const gulpStylelint = require('gulp-stylelint')
const sourcemaps = require('gulp-sourcemaps')

gulpSass.compiler = require('node-sass')

const sassParser = () => {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(gulpSass({
      sync: true,
      outputStyle: 'expanded'
    }).on('error', gulpSass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulpStylelint({
      debug: true,
      fix: true,
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(distPath))
}

exports.sassParser = sassParser
