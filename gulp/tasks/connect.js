'use strict';

const gulp    = require('gulp');
const connect = require('gulp-connect');
const open    = require('gulp-open');
const config  = require('../config');

const uri = `http://localhost:${config.port}/topics/${config.topic}`;

gulp.task('connect', () => {
  connect.server({
    root: config.build.root,
    port: config.port,
    livereload: true
  });
});

gulp.task('open', () => {
  return gulp.src(__filename)
    .pipe(open({ uri: uri }));
});

gulp.task('serve', [ 'connect', 'open' ]);
