var config = require('./gulp/config.js');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create(config.app.name);
var javascript = require('./gulp/javascript.js');
var css = require('./gulp/css.js');

gulp.task('js', function () {
  return javascript();
});

gulp.task('css', function () {
  return css();
});

gulp.task('serve', ['js', 'css'], function () {
  browserSync.init({
    server: '.'
  });

  gulp.watch(['./src/**/*.scss'], ['css']);
  gulp.watch(['./src/**/*.html', './index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
