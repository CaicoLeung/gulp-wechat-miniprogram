import { Gulpclass, Task, SequenceTask, MergedTask } from 'gulpclass'

import * as gulp from 'gulp';
import * as sass from 'gulp-sass'
import * as sourcemaps from 'gulp-sourcemaps';
import * as ts from 'gulp-typescript';
import * as tslint from 'gulp-tslint';
import * as concat from 'gulp-concat';
import * as uglify from 'gulp-uglify';
import * as rename from 'gulp-rename';
import * as del from 'del';
import * as colors from 'colors';

@Gulpclass()
export class Gulpfile {
  @Task()
  clean = async () => {
    const deletePaths: string[] = await del(['dist/**'], {dryRun: true});
    console.log(colors.red('以下文件和目录将被删除:'));
    console.log(colors.yellow(deletePaths.join('\n')));
  }

  @Task()
  sass() {
    return gulp.src('app/**/*.+(sass|scss)')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('dist/css'));
  }
}
