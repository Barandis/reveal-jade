'use strict';

const gulp   = require('gulp');
const config = require('../config');

gulp.task('assets:common', () => {
  return gulp.src(`${config.src.assets}/**/*`)
    .pipe(gulp.dest(config.build.assets));
});

gulp.task('assets:topic', () => {
  const basePath = config.base;
  const topicPath = `${config.base}/${config.topic}`;
  const src = config.topic === '' ? 
    [ 
      `${basePath}/**/*`,
      `!${basePath}/**/*.js`,
      `!${basePath}/**/*.ls`,
      `!${basePath}/**/*.css`,
      `!${basePath}/**/*.styl`,
      `!${basePath}/**/*.html`,
      `!${basePath}/**/*.jade` 
    ] : 
    [ 
      `${topicPath}/**/*`,
      `!${topicPath}/**/*.js`,
      `!${topicPath}/**/*.ls`,
      `!${topicPath}/**/*.css`,
      `!${topicPath}/**/*.styl`,
      `!${topicPath}/**/*.html`,
      `!${topicPath}/**/*.jade`
    ];
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});
