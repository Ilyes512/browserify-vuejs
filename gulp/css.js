var config = require('./config.js');
var browserSync = require('browser-sync').get(config.app.name);
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var filter = require('gulp-filter');

function css() {
  var cssFilter = filter('**/*.css', {restore: true});

  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: config.css.minify ? 'compressed' : 'nested'
    }))
    .pipe(cssFilter)
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(cssFilter.restore)
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream({match: '**/*.css'}));
  // using 'match' will prevent hard refresh instead of injecting the new css
}

module.exports = css;