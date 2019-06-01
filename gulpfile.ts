/// <reference path="./node_modules/@types/node/index.d.ts" />
/// <reference path="./node_modules/@types/gulp-autoprefixer/index.d.ts" />
/// <reference types="node" />

import { Options } from "gulp-autoprefixer";

const gulp         = require('gulp');
const babel        = require('gulp-babel');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const cssnano      = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');
const ts           = require('gulp-typescript');
const eslint       = require('gulp-eslint')
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const rename       = require('gulp-rename');
const del          = require('del');
const colors       = require('colors');

gulp.task('clean', async () => {
  const deletePaths = await del('dist/**');
  console.log(colors.red('Files and folders that would be deleted:\n') + colors.yellow(deletePaths.join('\n')));
});

gulp.task('sass', gulp.series('clean', () => {
  const autoprefixerOptions: Options = {
    browsers: ['last 2 versions'],
    cascade: true,
    remove: true
  };
  const plugins = [
    autoprefixer,
    cssnano
  ];
  return gulp.src('app/scss/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(postcss([cssnano]))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'));
}));

gulp.task('sass:watch',  () => {
  gulp.watch('app/scss/**/*.+(scss|sass)', gulp.series('sass'));
});

gulp.task('babel', gulp.series('clean', () => {
  return gulp.src('app/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
}));

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
