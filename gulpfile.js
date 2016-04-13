var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  notify = require('gulp-notify'),
  uglify = require('gulp-uglify'),
  cssNano = require('gulp-cssnano'),
  ngAnnotate = require('gulp-ng-annotate'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  bowerDirectory = './bower_components/',
  notBowerDirectory = '!./bower_components/',
  livereload = require('gulp-livereload');

gulp.task('jshint', function(){
  return gulp.src(['*.js', 'client-app/**/*.js'], ['jshint'])
    .pipe(jshint({"moz":true}))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({ sound: "Funk" }));
});

gulp.task('clean', function(){
  return gulp.src('./public/*')
    .pipe(clean({force: true}));
});

// copy bower JS dependencies
gulp.task('compile-bower', function(){
  return gulp.src([
      bowerDirectory + 'jquery/dist/jquery.min.js',
      bowerDirectory + 'angular/angular.min.js',
      bowerDirectory + 'angular-cookies/angular-cookies.min.js',
      bowerDirectory + 'angular-resource/angular-resource.min.js',
      bowerDirectory + 'angular-route/angular-route.min.js',
      bowerDirectory + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
      bowerDirectory + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
      ])
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./public/js')).pipe(livereload());
});

// copy Bootstrap fonts
gulp.task('copy-fonts', function(){
  return gulp.src([bowerDirectory + 'bootstrap-sass/assets/fonts/**/*.*'])
    .pipe(gulp.dest('./public/fonts')).pipe(livereload());
});

//compile javascript
gulp.task('compile-js', function(){
  return gulp.src(['./client-app/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./public/js')).pipe(livereload());
});

// Execute SASS parsing
gulp.task('sass', function(){
  return gulp.src('./client-app/sass/**/*.scss')
    .pipe(sass({precision: 8}).on('error',notify.onError({ sound: "Funk"})))
    .pipe(cssNano())
    .pipe(gulp.dest('./public/css')).pipe(livereload());
});

// Copy app public folder
gulp.task('copy', function(){
  return gulp.src(['./client-app/**/*.*', '!./client-app/sass/**/*.*','!./client-app/js/**/*.js'])
    .pipe(gulp.dest('./public/')).pipe(livereload());
});

gulp.task('build', ['copy', 'copy-fonts', 'compile-bower', 'compile-js', 'sass'], function(){
  livereload();
});

gulp.task('watch-for-jshint', function(){
  return watch(['*.js', 'client-app/**/*.js'], ['jshint']);
});
gulp.task('watch-for-compile-js', function(){
  livereload.listen({start:true});
  return watch('client-app/**/*.js', ['compile-js']);
});
gulp.task('watch-for-compile-sass', function(){
  livereload.listen({start:true});
  return watch('client-app/**/*.scss', ['sass']);
});
gulp.task('watch-for-compile-copy', function(){
  livereload.listen({start:true});
  // return watch(['client-app/**/*.*', '!client-app/**/*.js', '!client-app/**/*.scss'], ['copy']);
  return watch(['client-app/**/*.*', '!client-app/**/*.js', '!client-app/**/*.scss'])
    .pipe(gulp.dest('./public/')).pipe(livereload());
});
 
gulp.task('default', ['watch-for-jshint','watch-for-compile-js','watch-for-compile-sass',
  'watch-for-compile-copy','jshint']);