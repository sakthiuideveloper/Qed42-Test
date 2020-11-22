'use strict';

if (!this.Promise) {
  var Promise = require('es6-promise').Promise;
}
var gulp = require('gulp'),
sass = require('gulp-sass'),
globbing = require('gulp-css-globbing');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');

// Error notifications
var reportError = function(error) {
  $.notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

// Sass processing
gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(globbing({
        // Configure it to use SCSS files
        extensions: ['.scss']
    }))
    .pipe($.sourcemaps.init())
    // Convert sass into css
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      outputStyle: 'nested', 
      includePaths: [
       './node_modules/compass-mixins/lib'
      ]
    }))
    
    // Show errors
    .on('error', reportError)
    // Autoprefix properties
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))

    // Save css
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
    
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('scripts/**/*.js')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('images'));
});

// Compress JS
gulp.task('compress', function() {
  return gulp.src('scripts/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist'))
    .pipe($.notify({
      title: "JS Minified",
      message: "JS files in the theme have been minified.",
      onLast: true
    }));
});

// Run drush to clear the theme registry
gulp.task('drush', function() {
  return gulp.src('', {
      read: false
    })
    .pipe($.shell([
      'drush cr css-js',
    ]))
    .pipe($.notify({
      title: "Caches cleared",
      message: "Drupal CSS/JS caches cleared.",
      onLast: true
    }));
});

// BrowserSync
gulp.task('browser-sync', function() {
  //watch files
  var files = [
    'css/style.css',
    'dist/main.js',
    'images/**/*',
    'templates/**/*.twig'
  ];
  //initialize browsersync
  browserSync.init(files, {
    proxy: "" 
  });
});


// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync', 'drush'], function() {
  gulp.watch("sass/**/*.scss", ['sass']);
  gulp.watch("scripts/**/*.js", ['compress']);
  gulp.watch("scripts/**/*.js", ['compress']);
  gulp.watch(['drush']);
});
