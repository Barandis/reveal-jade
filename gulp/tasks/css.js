'use strict';

const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const stylus  = require('gulp-stylus');
const rename  = require('gulp-rename');
const config  = require('../config');

function handler(self) {
  return err => {
    console.log(err);
    self.emit('end');
  };
}

gulp.task('css:common:css', () => {
  return gulp.src(`${config.src.css}/**/*.css`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(gulp.dest(config.build.css));
});

gulp.task('css:common:stylus', () => {
  return gulp.src(`${config.src.css}/**/*.root.styl`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(stylus(config.stylus))
    .pipe(rename(path => {
      path.basename = path.basename.slice(0, -5);
    }))
    .pipe(gulp.dest(config.build.css));
});

gulp.task('css:topic:css', () => {
  return gulp.src(`${config.src.topic}/**/*.css`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('css:topic:stylus', () => {
  return gulp.src(`${config.src.topic}/**/*.root.styl`)
    .pipe(plumber({ handleError: handler(this) }))
    .pipe(stylus(config.stylus))
    .pipe(rename(path => {
      path.basename = path.basename.slice(0, -5);
    }))
    .pipe(gulp.dest(config.build.topic));
});

gulp.task('css:common', [ 'css:common:css', 'css:common:stylus' ]);
gulp.task('css:topic', [ 'css:topic:css', 'css:topic:stylus' ]);
