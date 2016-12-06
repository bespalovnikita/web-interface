var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    img: 'src/images/*',
    vendor: {
      css: 'src/vendor/*.css'
    },
    dist: {
      css:  'dist/styles/',
      html: 'dist/',
      img: 'dist/images/',
      vendor: 'dist/vendor/',
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('css-min', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.css));
});


gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('img', function () {
  return gulp.src(path.img)
    .pipe(gulp.dest(path.dist.img));
});

gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('vendor-css-min', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('build', ['html', 'css', 'vendor-css', 'img']);
gulp.task('prod', ['html', 'css-min', 'vendor-css-min', 'img']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.img, ['img']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
