const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const eslint = require('gulp-eslint')
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const colors = require('colors');

gulp.task('clean', async function () {
  const deletePaths = await del('dist/**/*', {
    dryRun: true
  });
  console.log(colors.red('Files and folders that would be deleted:\n') + colors.yellow(deletePaths.join('\n')));
});

const autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: true,
  add: true,
  remove: true,
  flexbox: true
};
gulp.task('sass', gulp.series('clean', function () {
  return gulp.src('app/scss/**/*.+(scss|sass)')
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'));
}));

gulp.task('sass:watch', function () {
  gulp.watch('app/scss/**/*.+(scss|sass)', gulp.series('sass'));
});

gulp.task('ts', function () {
  return gulp.src('app/js/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function () {
  return gulp.src('app/js/**/*.+(js|ts)')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
