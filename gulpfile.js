const gulp   = require('gulp');
const sass   = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function() { 
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
});

gulp.task('ts', function() {
  return gulp.src('app/js/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('dist/js'));
});

// gulp.task('lint', function() {
//   gulp.src('app/js/**/*.+(js|ts)')
//       .pipe(jshint())
//       .pipe(jshint.reporter('default'));
// });

// gulp.task('default', function() {
//   gulp.run('lint', 'sass');
// });