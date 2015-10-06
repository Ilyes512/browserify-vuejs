import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('default', function () {
  runSequence([
    'browserify:dev',
    'browserify:vendor',
    'scss:dev',
    'watch'
  ], 'serve');
});
