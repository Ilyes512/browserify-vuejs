import config from '../config';

import gulp from 'gulp';

import {get} from 'browser-sync';

gulp.task('watch', function () {
  var bs = get(config.appname);

  gulp.watch([config.js.files, config.html.files], ['browserify:dev']).on('change', bs.reload);
  gulp.watch(config.scss.files, ['scss:dev']);
  gulp.watch(config.html.files).on('change', bs.reload);
});