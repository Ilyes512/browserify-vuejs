import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('build', function () {
  runSequence(
    //'lint',
    'clean',
    'copy:build',
    [
      'browserify:build',
      'browserify:vendor:build',
      'scss:build',
    ],
    'cachebust'
  );
});