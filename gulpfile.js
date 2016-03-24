var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

//gulp-ruby-sass and autoprefixer
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//gulp-jshint, gulp-concat and gulp-uglify
gulp.task('scripts', function() {
return gulp.src('src/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

//gulp-imagemin
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

//Cleaning up the destination folders and rebuild files
gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

//Setting up default tasks to be run when the "gulp" command is called in the terminal
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

//Watch changes in files
// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});
