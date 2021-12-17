const { src, dest, series } = require('gulp');

function pageTask() {
  return src('src/*.html').pipe(dest('dist'));
}

function scriptTask() {
  return src('src/*.js').pipe(dest('dist'));
}

function styleTask() {
  return src('src/*.css').pipe(dest('dist'));
}

function defaultTask() {}

exports.default = series(pageTask, scriptTask, styleTask);

exports.pages = pageTask;
exports.scripts = scriptTask;
exports.styles = styleTask;
