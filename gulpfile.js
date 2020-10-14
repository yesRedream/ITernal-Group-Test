const { src, dest, watch, series } = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();


function html() {
  return src('src/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('dist'));
}

function styles() {
  return src('src/sass/main.sass')
    .pipe(sass({
      includePaths: ['src/sass'],
      errLogToConsole: true,
      onError: browserSync.notify
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function assets() {
  return src('src/assets/**/*')
    .pipe(dest('dist/'));
}

function watchAndServe() {
  browserSync.init({
    server: 'dist',
  });

  watch('src/sass/**/*.sass', styles);
  watch('src/pug/**/*.pug', html);
  watch('src/assets/**/*', assets);
  watch('dist/*.html').on('change', browserSync.reload);
}


exports.html = html;
exports.styles = styles;
exports.watch = watchAndServe;
exports.default = series(html, styles, assets, watchAndServe);