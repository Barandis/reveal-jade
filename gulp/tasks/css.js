'use strict';

const gulp   = require('gulp');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const config = require('../config');

gulp.task('css:common:css', () => {
  return gulp.src(`${config.src.css}/**/*.css`)
    .pipe(gulp.dest(config.build.css));
});

gulp.task('css:common:stylus', () => {
  return gulp.src(`${config.src.css}/**/*.root.styl`)
    .pipe(stylus(config.stylus))
    .pipe(rename(path => {
      path.basename = path.basename.slice(0, -5);
    }))
    .pipe(gulp.dest(config.build.css));
});

gulp.task('css:topic:css', () => {
  const src = config.topic === '' ? `${config.base}/**/*.css` : `${config.base}/${config.topic}/**/*.css`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('css:topic:stylus', () => {
  const src = config.topic === '' ? `${config.base}/**/*.css` : `${config.base}/${config.topic}/**/*.root.styl`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(stylus(config.stylus))
    .pipe(rename(path => {
      path.basename = path.basename.slice(0, -5);
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('css:common', [ 'css:common:css', 'css:common:stylus' ]);
gulp.task('css:topic', [ 'css:topic:css', 'css:topic:stylus' ]);
