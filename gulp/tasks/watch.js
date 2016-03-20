'use strict';

const gulp   = require('gulp');
const config = require('../config')

gulp.task('watch', () => {
  gulp.watch([ `${config.src.topic}/**/*.js`, `${config.src.topic}/**/*.ls` ], ['js:topic']);
  gulp.watch([ `${config.src.topic}/**/*.css`, `${config.src.topic}/**/*.styl` ], ['css:topic']);
  gulp.watch([ `${config.src.topic}/**/*.html`, `${config.src.topic}/**/*.jade` ], ['html:topic']);
  gulp.watch([ 
      `${config.src.topic}/**/*`,
      `!${config.src.topic}/**/*.js`,
      `!${config.src.topic}/**/*.ls`,
      `!${config.src.topic}/**/*.css`,
      `!${config.src.topic}/**/*.styl`,
      `!${config.src.topic}/**/*.html`,
      `!${config.src.topic}/**/*.jade`
    ], ['assets:topic']);
});
