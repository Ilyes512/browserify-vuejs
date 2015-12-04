import config from '../config';
import options from '../options';

import gulp from 'gulp';
import gutil from 'gulp-util';
//import gulpif from 'gulp-if';

//import filter from 'gulp-filter';
//import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import watchify from 'watchify';
import browserify from 'browserify';

//import {reload} from 'browser-sync';

import babelify from 'babelify';
import partialify from 'partialify';
import stripify from 'stripify';

// To be excluded from the app.js
var libs = config.browserify.vendor.libs;

/*
 Browserify for the development (app)
 */
gulp.task('browserify:dev', function () {
  var devOpts = {
    entries: config.browserify.dev.entries,
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.js', '.html', '.json'],
    debug: options.debug
  };

  var opts = Object.assign({}, watchify.args, devOpts);
  var bundler = watchify(browserify(opts));

  function bundle() {
    return bundler.bundle()
      .pipe(plumber())
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(config.browserify.dev.out))
      .pipe(buffer())
      .pipe(gulp.dest(config.app));
  }

  // Transformers
  bundler
    .transform(babelify, {presets: ['es2015']})
    .transform(partialify);

  libs.forEach(function (lib) {
    bundler.exclude(lib);
  });

  bundler.on('update', bundle);

  return bundle();
});

/*
 Browserify for the development (vendor)
 */
gulp.task('browserify:vendor', function () {
  var bundler = browserify({
    debug: options.debug
  });

  libs.forEach(function (lib) {
    bundler.require(lib);
  });

  return bundler.bundle()
    .pipe(source(config.browserify.vendor.out))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest(config.app));
});

/*
 Browserify for the app build
 */
gulp.task('browserify:build', function () {
  var bundler = browserify({
    entries: config.browserify.dev.entries
  });

  bundler
    .transform(babelify, {presets: ['es2015']})
    .transform(partialify)
    .transform(stripify);

  libs.forEach(function (lib) {
    bundler.exclude(lib);
  });

  return bundler.bundle()
    .pipe(source(config.browserify.dev.out))
    .pipe(buffer())
    // add transformation tasks to the pipeline here
    .pipe(uglify())
    .pipe(gulp.dest(config.build));
});

/*
 Browserify for the vendor build
 */
gulp.task('browserify:vendor:build', function () {
  var bundler = browserify();

  libs.forEach(function (lib) {
    bundler.require(lib);
  });

  return bundler.bundle()
    .pipe(source(config.browserify.vendor.out))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.build));
});