var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifyJs = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('sass/main.scss', ['sass']);
  gulp.watch('js/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['./']
    },
    routes: {
      "node_modules" : "node_modules"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('bundled-min-js', function() {
  return gulp.src('js/*.js')
  .pipe(concat('bundled.min.js'))
  .pipe(uglifyJs())
  .pipe(gulp.dest('dist'));
});

gulp.task('bundled-min-css', function() {
  return gulp.src('css/*.css')
  .pipe(concat('bundled.min.css'))
  .pipe(uglifyCss())
  .pipe(gulp.dest('dist'));
});

gulp.task('build-assets', ['bundled-min-js', 'bundled-min-css']);
