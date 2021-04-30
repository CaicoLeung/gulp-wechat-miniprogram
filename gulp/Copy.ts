import { distPath, imgFiles, jsFiles, jsonFiles, miniprogramSource, projectconfig, wxmlFiles, wxsFiles, wxssFiles } from './SourcePath'
import gulp from 'gulp'
import gulpTypescript from 'gulp-typescript'
import rename from 'gulp-rename'
// import imagemin from 'gulp-imagemin'

export const imagesCopy = () => {
  return gulp.src(imgFiles, { since: gulp.lastRun(imagesCopy) })
    // .pipe(imagemin())
    .pipe(gulp.dest(distPath))
}

export const jsCopy = () => {
  return gulp.src(jsFiles, { since: gulp.lastRun(jsCopy) })
    .pipe(gulp.dest(distPath))
}

export const wxsCopy = () => {
  return gulp.src(wxsFiles, { since: gulp.lastRun(wxsCopy) })
    .pipe(gulpTypescript()).js
    .pipe(rename({
      extname: '.wxs'
    }))
    .pipe(gulp.dest(distPath))
}

export const wxssCopy = () => {
  return gulp.src(wxssFiles, { since: gulp.lastRun(wxssCopy) })
    .pipe(gulp.dest(distPath))
}

export const wxmlCopy = () => {
  return gulp.src(wxmlFiles, { since: gulp.lastRun(wxmlCopy) })
    .pipe(gulp.dest(distPath))
}

export const jsonCopy = () => {
  return gulp.src(jsonFiles, { since: gulp.lastRun(jsonCopy) })
    .pipe(gulp.dest(distPath))
}

export const miniprogramSourceCopy = () => {
  return gulp.src(miniprogramSource, { since: gulp.lastRun(miniprogramSourceCopy) })
    .pipe(gulp.dest(distPath))
}

export const projectconfigCopy = () => {
  return gulp.src(projectconfig, { since: gulp.lastRun(projectconfigCopy) })
    .pipe(gulp.dest(distPath))
}
