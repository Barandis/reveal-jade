'use strict';

const gulp = require('gulp');

gulp.task('build:common', [ 'js:common', 'css:common', 'html:common' ]);
gulp.task('build:topic',  [ 'js:topic',  'css:topic',  'html:topic' ]);
gulp.task('build', [ 'build:topic ']);
