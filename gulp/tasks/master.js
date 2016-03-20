'use strict';

const gulp   = require('gulp');
const run    = require('run-sequence');
const config = require('../config');

gulp.task('present', [ 'serve' ]);
gulp.task('develop', done => {
  run([ 'build:common', 'build:topic' ], [ 'watch', 'serve' ]);
});

gulp.task('default', [ 'present' ]);
