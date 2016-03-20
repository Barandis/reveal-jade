'use strict';

const gulp   = require('gulp');
const gutil  = require('gulp-util');
const del    = require('del');
const config = require('../config');

function logDeleted(paths) {
  const count = paths.length;
  const message = count === 1 ? 'file or directory:' : 'files and directories:';
  if (count > 0) {
    gutil.log(gutil.colors.cyan('[del]'), "Deleted", gutil.colors.bold.red(count), message);
    paths.forEach(path => {
      gutil.log(gutil.colors.cyan('[del]'), gutil.colors.green(path));
    });
  }
}

gulp.task('clean', done => {
  const path = config.topic === '' ? `${config.build.root}/**` : `${config.build.topic}/**`;
  del(path, { force: true }).then(paths => {
    logDeleted(paths);
    done();
  });
});
