import { distPath, sassFiles } from './SourcePath'
import gulp from 'gulp'
import gulpSass from 'gulp-dart-sass'
import gulpStylelint from 'gulp-stylelint'
// import dartSass from 'sass'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

export const sassParser = () => {
  return gulp.src(sassFiles)
    .pipe(gulpStylelint({
      fix: true,
      failAfterError: true,
      reporters: [
        { formatter: 'verbose', console: true }
      ]
    }))
    .pipe(sourcemaps.init())
    .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(distPath))
}
