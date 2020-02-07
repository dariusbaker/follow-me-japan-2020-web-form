const CONFIG     = require('../config');
const nunjucks   = require('gulp-nunjucks-render');
const { src, dest, series }    = require('gulp');
const { reload } = require('./browsersync');
const del        = require('del');

const html = series(
  templating,
  moveHomePageFolderToRoot,
  cleanHomeFolder
);

function templating() {
  return src(CONFIG.SRC.HTML)
    .pipe(nunjucks(CONFIG.NUNJUCKS_OPTIONS))
    .pipe(dest(CONFIG.DIST.ROOT));
}

function cleanHomeFolder() {
  return del([`${CONFIG.DIST.ROOT}/home`]);
}

function moveHomePageFolderToRoot() {
  return src(`${CONFIG.DIST.ROOT}/home/index.html`)
    .pipe(dest(CONFIG.DIST.ROOT))
    .pipe(reload());
}

module.exports = {
  html,
};