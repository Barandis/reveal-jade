'use strict';

const gulp = require('gulp');

gulp.task('build:common', [ 'js:common', 'css:common', 'assets:common' ]);
gulp.task('build:topic',  [ 'js:topic',  'css:topic',  'html:topic', 'assets:topic' ]);
gulp.task('build', [ 'build:topic ']);
