var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  notify = require('gulp-notify'),
  uglify = require('gulp-uglify'),
  cssNano = require('gulp-cssnano'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  bowerDirectory = './bower_components/',
  notBowerDirectory = '!./bower_components/';

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
gulp.task('compile-bower', ['clean'], function(){
  return gulp.src([
      bowerDirectory + 'jquery/dist/jquery.min.js',
      bowerDirectory + 'angular/angular.min.js',
      bowerDirectory + 'angular-cookies/angular-cookies.min.js',
      bowerDirectory + 'angular-resource/angular-resource.min.js',
      bowerDirectory + 'angular-route/angular-route.min.js',


      bowerDirectory + 'Materialize/js/initial.js',
      bowerDirectory + 'Materialize/js/jquery.easing.1.3.js',
      bowerDirectory + 'Materialize/js/animation.js',
      bowerDirectory + 'Materialize/js/velocity.min.js',
      bowerDirectory + 'Materialize/js/hammer.min.js',
      bowerDirectory + 'Materialize/js/jquery.hammer.js',
      bowerDirectory + 'Materialize/js/global.js',
      bowerDirectory + 'Materialize/js/collapsible.js',
      bowerDirectory + 'Materialize/js/dropdown.js',
      bowerDirectory + 'Materialize/js/leanModal.js',
      bowerDirectory + 'Materialize/js/materialbox.js',
      bowerDirectory + 'Materialize/js/parallax.js',
      bowerDirectory + 'Materialize/js/tabs.js',
      bowerDirectory + 'Materialize/js/tooltip.js',
      bowerDirectory + 'Materialize/js/waves.js',
      bowerDirectory + 'Materialize/js/toasts.js',
      bowerDirectory + 'Materialize/js/sideNav.js',
      bowerDirectory + 'Materialize/js/scrollspy.js',
      bowerDirectory + 'Materialize/js/forms.js',
      bowerDirectory + 'Materialize/js/slider.js',
      bowerDirectory + 'Materialize/js/cards.js',
      bowerDirectory + 'Materialize/js/chips.js',
      bowerDirectory + 'Materialize/js/pushpin.js',
      bowerDirectory + 'Materialize/js/buttons.js',
      bowerDirectory + 'Materialize/js/transitions.js',
      bowerDirectory + 'Materialize/js/scrollFire.js',
      bowerDirectory + 'Materialize/js/date_picker/picker.js',
      bowerDirectory + 'Materialize/js/date_picker/picker.date.js',
      bowerDirectory + 'Materialize/js/character_counter.js',
      bowerDirectory + 'Materialize/js/carousel.js',




      ])
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./public/js'));
});

// copy materialize fonts
gulp.task('copy-fonts',['clean'], function(){
  return gulp.src([bowerDirectory + 'Materialize/fonts/**/*.*'])
    .pipe(gulp.dest('./public/fonts'));
});

//compile javascript
gulp.task('compile-js',['clean'], function(){
  return gulp.src(['./client-app/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'));
});

//compile minified javascript
gulp.task('compile-minified-js',['clean'], function(){
  return gulp.src(['./client-app/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// Execute SASS parsing
gulp.task('sass', ['clean'], function(){
  return gulp.src('./client-app/sass/**/*.scss')
    .pipe(sass({precision: 8}).on('error',notify.onError({ sound: "Funk"})))
    .pipe(cssNano())
    .pipe(gulp.dest('./public/css'));
});

// Execute SASS parsing, minified
gulp.task('sass-minified', ['clean'], function(){
  return gulp.src('./client-app/sass/**/*.scss')
    .pipe(sass({precision: 8}).on('error',notify.onError({ sound: "Funk"})))
    .pipe(cssNano())
    .pipe(gulp.dest('./public/css'));
});

// Copy app public folder
gulp.task('copy', ['clean'], function(){
  return gulp.src(['./client-app/**/*.*', '!./client-app/sass/**/*.*','!./client-app/js/**/*.js'])
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['jshint','copy', 'copy-fonts', 'compile-bower', 'compile-js', 'sass']);
gulp.task('build-deployed-version', ['copy', 'copy-fonts', 'compile-bower', 'compile-minified-js', 'sass-minified']);

gulp.task('watch-for-jshint', function(){
  return gulp.watch(['*.js', 'client-app/**/*.js'], ['jshint']);
});
gulp.task('watch-for-compile', function(){
  return gulp.watch('client-app/**/*.*', ['build']);
});
 
gulp.task('default', ['watch-for-jshint','watch-for-compile','jshint']);