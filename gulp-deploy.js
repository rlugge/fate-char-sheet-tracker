var gulp = require('gulp'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  cssNano = require('gulp-cssnano'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  ngAnnotate = require('gulp-ng-annotate'),
  bowerDirectory = './bower_components/',
  notBowerDirectory = '!./bower_components/';

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
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// copy Bootstrap fonts
gulp.task('copy-fonts', function(){
  return gulp.src([bowerDirectory + 'bootstrap-sass/assets/fonts/**/*.*'])
    .pipe(gulp.dest('./public/fonts'));
});

//compile javascript
gulp.task('compile-js', function(){
  return gulp.src(['./client-app/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// Execute SASS parsing
gulp.task('sass', function(){
  return gulp.src('./client-app/sass/**/*.scss')
    .pipe(sass({precision: 8}))
    .pipe(cssNano())
    .pipe(gulp.dest('./public/css'));
});

// Copy app public folder
gulp.task('copy', function(){
  return gulp.src(['./client-app/**/*.*', '!./client-app/sass/**/*.*','!./client-app/js/**/*.js'])
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['copy', 'copy-fonts', 'compile-bower', 'compile-js', 'sass']);

gulp.task('default', ['build']);