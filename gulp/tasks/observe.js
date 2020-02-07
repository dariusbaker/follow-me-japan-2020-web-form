const CONFIG     = require('../config');

const { html }   = require('./html');
const scripts    = require('./scripts');
const styles     = require('./styles');
const { watch }  = require('gulp');
const { series } = require('gulp');

function observe(done) {
  watch(`${CONFIG.SRC.ROOT}/**/*.{njk,html}`, html);
  watch(CONFIG.SRC.JS, scripts);
  watch(CONFIG.SRC.CSS, styles);
  watch(CONFIG.SRC.SVG, series(html));
  done();
}

module.exports = observe;