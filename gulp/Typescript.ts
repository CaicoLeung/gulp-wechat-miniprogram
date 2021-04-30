import { distPath, tsFiles } from './SourcePath'
import babel from 'gulp-babel'
import colors from 'colors'
import eslint from 'gulp-eslint'
import gulp from 'gulp'
import gulpTypescript from 'gulp-typescript'
import sourcemaps from 'gulp-sourcemaps'

const tsConfig = gulpTypescript.createProject('app/tsconfig.json')

export const tsParser = () => {
  return gulp.src(tsFiles, { since: gulp.lastRun(tsParser) })
    .pipe(sourcemaps.init())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(tsConfig()).js
    .on('error', (err: string) => { console.log(colors.red(err)) })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
}
