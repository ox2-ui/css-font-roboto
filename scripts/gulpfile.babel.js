import gulp from 'gulp';
import cssBase64 from 'gulp-css-base64';

// Fetch replace all the font urls with base64-encoded data URI strings.
gulp.task('default', () => {
  return gulp.src('../downloads/index.css')
          .pipe(cssBase64())
          .pipe(gulp.dest('../src'));
});
