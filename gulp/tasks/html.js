'use strict';

const gulp   = require('gulp');
const jade   = require('gulp-jade');
const config = require('../config');

gulp.task('html:topic:html', () => {
  const src = config.topic === '' ? `${config.base}/**/*.html` : `${config.base}/${config.topic}/**/*.html`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('html:topic:jade', () => {
  const src = config.topic === '' ? `${config.base}/**/*.jade` : `${config.base}/${config.topic}/**/*.jade`;
  const dest = config.topic === '' ? config.build.root : `${config.build.root}/${config.topic}`;
  return gulp.src(src)
    .pipe(jade(config.jade))
    .pipe(gulp.dest(dest));
});

gulp.task('html:topic', [ 'html:topic:html', 'html:topic:jade' ]);
