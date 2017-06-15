'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('js-lint', () => {
  console.log('inside js-lint');
  return gulp.src([
    __dirname + '/**/*.js',
    '!' + __dirname + '/node_modules{,/**}',
    // TODO(surenderthakran): remove this filter when vidnetserver is deleted.
    '!' + __dirname + '/vidnetserver{,/**}'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch([
    __dirname + '/**/*.js',
    '!' + __dirname + '/node_modules{,/**}',
  ], ['js-lint']);
});
