var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', function(){
});

gulp.task('webpack:build', function(){
  var myConfig = Object.create(webpackConfig);
  return gulp.src('javascripts/entry.js')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('./public/'));
});
