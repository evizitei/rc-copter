var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish-ex');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack:build', function(){
  var myConfig = Object.create(webpackConfig);
  return gulp.src('lib/entry.js')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('./public/'));
});

gulp.task('lint', function(){
  var source = ['./lib/*.js', './test/*.js'];
  return gulp.src(source)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter( stylish ));
});
