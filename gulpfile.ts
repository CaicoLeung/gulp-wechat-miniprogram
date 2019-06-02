import { Options } from "gulp-autoprefixer";
import { async } from "q";

const path         = require('path');
const gulp         = require('gulp');
const babel        = require('gulp-babel');
const sassParse    = require('gulp-sass');
const imagemin     = require('gulp-imagemin');
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

const appPath   = 'app/**';
const distPath  = 'dist';
const wxmlFiles = [`${appPath}/*.wxml`, `!${appPath}/template.wxml`];
const sassFiles = [`${appPath}/*.+(sass|scss)`, `!${appPath}/assets/css/*.+(sass|scss)`, `!${appPath}/template/*.+(sass|scss)`];
const jsonFiles = [`${appPath}/*.json`, `!${appPath}/template/*json`];
const tsFiles   = [`${appPath}/*.ts`, `!${appPath}/template/*ts`, `!${appPath}/*.d.ts`];
const imgFiles  = [`${appPath}/assets/img/**/*.{png.jpg.gif.ico}`]
const tsProject = ts.createProject('tsconfig.json', {
  noLib      : true,
  declaration: false
});

const clean = async () => {
  const deletePaths = await del('dist/**');
  console.log(colors.red('以下的文件和目录被删除:\n') + colors.yellow(deletePaths.join('\n')));
}
gulp.task(clean);

const wxml = () => {
  return gulp.src(wxmlFiles, {since: gulp.lastRun(wxml)})
    .pipe(gulp.dest(distPath));
};
gulp.task(wxml);

const typescript = () => {
  return gulp.src(tsFiles, {since: gulp.lastRun(typescript)})
  .pipe(sourcemaps.init())
  .pipe(tsProject())
  .on('error', () => {console.error("虽然报错了, 但是不影响编译结果, 先不管, 后面再解决")})
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(distPath));
};
gulp.task(typescript);

const json = () => {
  return gulp.src(jsonFiles, {since: gulp.lastRun(json)})
    .pipe(gulp.dest(distPath))
};
gulp.task(json)

const sass = () => {
  const autoprefixerOptions: Options = {
    browsers: ['last 2 versions'],
    cascade: true,
    remove: true
  };
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sassParse({outputStyle: 'compressed'}).on('error', sassParse.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath));
};
gulp.task(sass);

const images = () => {
  return gulp.src(imgFiles, {since: gulp.lastRun(images)})
    .pipe(imagemin())
    .pipe(gulp.dest(distPath));
};
gulp.task(images);

// parallel
gulp.task('build', gulp.series('clean', gulp.parallel('wxml', 'typescript', 'json', 'sass', 'images')));

// watch
gulp.task('watch', () => {
  gulp.watch(sassFiles, sass);
  gulp.watch(tsFiles, typescript);
  gulp.watch(imgFiles, images);
  gulp.watch(jsonFiles, json);
  gulp.watch(wxmlFiles, wxml);
});