'use strict';

const gulp   = require('gulp');
const lsc    = require('gulp-livescript');
const config = require('../config');

gulp.task('js:common:js', () => {
  return gulp.src(`${config.src.js}/**/*.js`)
    .pipe(gulp.dest(config.build.js));
});

gulp.task('js:common:ls', () => {
  return gulp.src(`${config.src.js}/**/*.ls`)
    .pipe(lsc(config.lsc))
    .pipe(gulp.dest(config.build.js));
});

gulp.task('js:topic:js', () => {
  const src = config.topic === '' ? `${config.base}/**/*.js` : `${config.base}/${config.topic}/**/*.js`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('js:topic:ls', () => {
  const src = config.topic === '' ? `${config.base}/**/*.ls` : `${config.base}/${config.topic}/**/*.ls`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(lsc(config.lsc))
    .pipe(gulp.dest(dest));
});

gulp.task('js:common', [ 'js:common:js', 'js:common:ls' ]);
gulp.task('js:topic', [ 'js:topic:js', 'js:topic:ls' ]);
gulp.task('js', [ 'js:topic' ]);
