var gulp = require('gulp');
var replace = require('gulp-replace');
var del = require('del');
var appVersion = require('./package.json').version;
require('gulp-release-it')(gulp);

gulp.task('clear', () => {
  del(['**/styles/*.css', 'build']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('add-app-version', function() {
  gulp
    .src(['build/index.html'])
    .pipe(replace('%REACT_APP_VERSION%', appVersion))
    .pipe(gulp.dest('build/'));
});
