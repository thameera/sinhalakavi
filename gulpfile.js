var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src(['./public/js/**/*.js', '!./public/js/vendor/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('demon', function() {
  nodemon({
    script: 'web.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
  .on('change', ['lint']);
});

gulp.task('default', ['lint', 'demon']);

