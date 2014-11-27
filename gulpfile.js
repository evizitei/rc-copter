var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish-ex');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack:build', function(){
  "use strict";
  var myConfig = Object.create(webpackConfig);
  return gulp.src('lib/entry.js')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('./public/'));
});

gulp.task('lint', function(){
  "use strict";
  var source = ['./lib/*.js', './test/*.js'];
  return gulp.src(source)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter( stylish ));
});


gulp.task('test', function () {
  "use strict";
  return gulp.src('test/test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
