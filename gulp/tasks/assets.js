'use strict';

const gulp   = require('gulp');
const config = require('../config');

gulp.task('assets:common', () => {
  return gulp.src(`${config.src.assets}/**/*`)
    .pipe(gulp.dest(config.build.assets));
});

gulp.task('assets:topic', () => {
  return gulp.src([ 
      `${config.src.topic}/**/*`,
      `!${config.src.topic}/**/*.js`,
      `!${config.src.topic}/**/*.ls`,
      `!${config.src.topic}/**/*.css`,
      `!${config.src.topic}/**/*.styl`,
      `!${config.src.topic}/**/*.html`,
      `!${config.src.topic}/**/*.jade`
    ])
    .pipe(gulp.dest(config.build.topic));
});
