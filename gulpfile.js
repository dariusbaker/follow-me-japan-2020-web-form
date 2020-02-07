const clean = require('./gulp/tasks/clean');
const copy = require('./gulp/tasks/copy');
const {html} = require('./gulp/tasks/html');
const observe = require('./gulp/tasks/observe');
const scripts = require('./gulp/tasks/scripts');
const styles = require('./gulp/tasks/styles');
const { serve } = require('./gulp/tasks/browsersync');
const { parallel } = require('gulp');
const { series } = require('gulp');

const setProdEnv = (done) => {
  process.env.NODE_ENV = 'prod';
  done();
};

const build = series(
  setProdEnv,
  clean,
  parallel(copy),
  parallel(styles, scripts, html)
);

const dev = series(
  build,
  observe,
  serve,
);

exports.default = dev;

exports.build = build;
exports.copy  = copy;
exports.css   = styles;
exports.html  = html;
exports.js    = scripts;
exports.serve = dev;
