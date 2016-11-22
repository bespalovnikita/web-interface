var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var path = {
	images: 'src/images/*',
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    dist: {
	  images: 'dist/images/',
      css:  'dist/styles/',
      html: 'dist/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.dist.images));
});

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('build', ['images', 'html', 'css']);

gulp.task('watch', function () {
  gulp.watch(path.images, ['images']);
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
