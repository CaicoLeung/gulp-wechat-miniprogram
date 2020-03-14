import gulp from 'gulp'
import sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel');
import colors from 'colors'
import gulpTypescript = require('gulp-typescript')
import { distPath, tsFiles } from './SourcePath'

const tsConfig = gulpTypescript.createProject('tsconfig.json')

const tsParser = () => {
  return gulp.src(tsFiles, { since: gulp.lastRun(tsParser) })
    .pipe(sourcemaps.init())
    .pipe(tsConfig())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', (err: string) => { console.log(colors.red(err)) })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
}

exports.tsParser = tsParser
