'use strict';

const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const lsc     = require('gulp-livescript');
const config  = require('../config');

function handler(self) {
  return err => {
    console.log(err);
    self.emit('end');
  };
}

gulp.task('js:common:js', () => {
  return gulp.src(`${config.src.js}/**/*.js`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(gulp.dest(config.build.js));
});

gulp.task('js:common:ls', () => {
  return gulp.src(`${config.src.js}/**/*.ls`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(lsc(config.lsc))
    .pipe(gulp.dest(config.build.js));
});

gulp.task('js:topic:js', () => {
  return gulp.src(`${config.src.topic}/**/*.js`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('js:topic:ls', () => {
  return gulp.src(`${config.src.topic}/**/*.js`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(lsc(config.lsc))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('js:common', [ 'js:common:js', 'js:common:ls' ]);
gulp.task('js:topic', [ 'js:topic:js', 'js:topic:ls' ]);
