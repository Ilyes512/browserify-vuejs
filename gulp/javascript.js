var config = require('./config.js');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').get(config.app.name);
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var partialify = require('partialify');
var exorcist = require('exorcist');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

// Input file
watchify.args.debug = true; // enables (inline) sourceMaps
var bundler = watchify(browserify('./src/app.js', watchify.args));

bundler
  .transform(babelify.configure({
    sourceMapRelative: 'src'
  }))
  .transform(partialify)
  .on('update', bundle);

function bundle() {
  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      browserSync.notify("Browserify Error!");
      this.emit('end');
    })
    .pipe(exorcist('build/app.js.map'))
    .pipe(source('app.js'))
    .pipe(gulpif(config.js.minify, buffer()))
    .pipe(gulpif(config.js.minify, uglify()))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream({once: true}));
};

module.exports = bundle;
