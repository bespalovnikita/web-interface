var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
    js: 'src/scripts/*.js',
    html: 'src/templates/*.html',
    partials: 'src/templates/partials/*.html',
    mock: 'src/mockapi/*.json',
    vendor: {
      css: 'src/vendor/css/*.css'
    },
    img: 'src/images/*',
    dist: {
      css:  'dist/styles/',
      js: 'dist/scripts/',
      html: 'dist/',
      partials: 'dist/partials/',
      vendor: 'dist/vendor/',
      img: 'dist/images/',
      mock: 'dist/mockapi/'
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

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js-min', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('partials', function () {
  return gulp.src(path.partials)
    .pipe(gulp.dest(path.dist.partials));
});

gulp.task('img', function () {
  return gulp.src(path.img)
    .pipe(gulp.dest(path.dist.img));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
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

gulp.task('build', ['html', 'partials', 'css', 'js', 'vendor-css', 'img', 'mock']);
gulp.task('prod', ['html', 'partials', 'css-min', 'js-min', 'vendor-css-min', 'img', 'mock']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.partials, ['partials']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.img, ['img']);
  gulp.watch(path.mock, ['mock']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
