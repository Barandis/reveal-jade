'use strict';

const gulp   = require('gulp');
const config = require('../config');

gulp.task('assets', () => {
  return gulp.src(`${config.src.assets}/**/*`)
    .pipe(gulp.dest(config.build.assets));
});
