// Generated on 2014-06-24 using generator-bookmarklet 0.2.0

'use strict';

var buffer = require('buffer');
var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpUglify = require('gulp-uglify');
var shell = require('gulp-shell');
var jshintStylish = require('jshint-stylish');
var map = require('map-stream');

gulp.task('scripts', function () {
  var header = new Buffer('j'+'avascript:');

  gulp.src('app/{,*/}*.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(gulpUglify())
    .pipe(gulpConcat('bookmarklet.js'))
    .pipe(map(function (file, cb) {
      file.contents = buffer.Buffer.concat([header, file.contents]);
      cb(null, file);
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(shell([
      'echo dist',
      'cat dist/bookmarklet.js | pbcopy'
    ]));
});
gulp.task('build', function () {
  var header = new Buffer('<a href="javascript:');

  gulp.src('app/{,*/}*.js')
    .pipe(gulpJshint())
    .pipe(gulpJshint.reporter(jshintStylish))
    .pipe(gulpUglify())
    .pipe(gulpConcat('deploy.html'))
    .pipe(map(function (file, cb) {
      file.contents = buffer.Buffer.concat([header, new Buffer(encodeURIComponent(file.contents.toString()) + '">Print This</a>')]);
      cb(null, file);
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(shell([
      'echo dist',
      'cat dist/bookmarklet.js | pbcopy'
    ]));
});

gulp.task('clean', function () {
  gulp.src('dist').pipe(gulpClean());
});

gulp.task('default', function () {
  gulp.run('clean', 'scripts');
});

gulp.task('watch', function () {
  gulp.watch('app/{,*/}*.js', function () {
    gulp.run('scripts');
    gulp.run('build');
  });
});
