'use strict';

const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const jade    = require('gulp-jade');
const config  = require('../config');

function handler(self) {
  return err => {
    console.log(err);
    self.emit('end');
  };
}

gulp.task('html:topic:html', () => {
  return gulp.src(`${config.src.topic}/**/*.html`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('html:topic:jade', () => {
  return gulp.src(`${config.src.topic}/**/*.jade`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(jade(config.jade))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('html:topic', [ 'html:topic:html', 'html:topic:jade' ]);
