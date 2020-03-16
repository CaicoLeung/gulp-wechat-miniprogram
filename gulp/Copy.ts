import { distPath, imgFiles, jsFiles, jsonFiles, wxmlFiles, wxsFiles, wxssFiles } from './SourcePath'
import gulp from 'gulp'
import gulpTypescript from 'gulp-typescript'
import rename from 'gulp-rename'
// import imagemin from 'gulp-imagemin'

const imagesCopy = () => {
  return gulp.src(imgFiles, { since: gulp.lastRun(imagesCopy) })
    // .pipe(imagemin())
    .pipe(gulp.dest(distPath))
}

const jsCopy = () => {
  return gulp.src(jsFiles, { since: gulp.lastRun(jsCopy) })
    .pipe(gulp.dest(distPath))
}

const wxsCopy = () => {
  return gulp.src(wxsFiles, { since: gulp.lastRun(wxsCopy) })
    .pipe(gulpTypescript()).js
    .pipe(rename({
      extname: '.wxs'
    }))
}

const wxssCopy = () => {
  return gulp.src(wxssFiles, { since: gulp.lastRun(wxssCopy) })
    .pipe(gulp.dest(distPath))
}

const wxmlCopy = () => {
  return gulp.src(wxmlFiles, { since: gulp.lastRun(wxmlCopy) })
    .pipe(gulp.dest(distPath))
}

const jsonCopy = () => {
  return gulp.src(jsonFiles, { since: gulp.lastRun(jsonCopy) })
    .pipe(gulp.dest(distPath))
}

exports.imagesCopy = imagesCopy
exports.jsCopy = jsCopy
exports.wxsCopy = wxsCopy
exports.wxssCopy = wxssCopy
exports.wxmlCopy = wxmlCopy
exports.jsonCopy = jsonCopy
