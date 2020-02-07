const ASSETS = 'assets';
const DIST   = 'dist';
const SRC    = 'src';
const DATA   = 'data';

const ordinal = (n) => {
  let res = '';
  if (n === 0) return res = String(n)

  switch (n % 10) {
    case 1:
      if (n === 11) return res = `${n}th`;
      res = `${n}st`;
      break;
    case 2:
      if (n === 12) return res = `${n}th`;
      res = `${n}nd`;
      break;
    case 3:
      if (n === 13) return res = `${n}th`;
      res = `${n}rd`;
      break;
    default:
      res = `${n}th`;
      break;
  }
  return res
};

const nunjucksEnv = function(environment) {
  environment.addFilter('json', JSON.stringify);
  environment.addFilter('ordinal', ordinal);
};

module.exports = {
  SRC: {
    ROOT      : SRC,
    DATA,
    DATA_FILES: `${DATA}/*.json`,
    HTML      : `${SRC}/html/pages/**/*.{njk,nunjucks,html}`,
    JS        : `${SRC}/js`,
    CSS       : `${SRC}/css`,
    IMG       : `${SRC}/img`,
    SVG       : `${SRC}/svg`,
  },

  DIST: {
    ROOT    : DIST,
    ASSETS  : `${DIST}/${ASSETS}`,
    CSS     : `${DIST}/${ASSETS}/css`,
    JS      : `${DIST}/${ASSETS}/js`,
    DATA    : `${DIST}/${ASSETS}/js/data`,
    SVG     : `${SRC}/html/partials`,
    IMG     : `${DIST}/${ASSETS}/img`,
  },

  HTMLMIN_OPTIONS: {
    removeComments    : true,
    collapseWhitespace: true,
  },

  BROWSERSYNC_OPTIONS: {
    server: DIST,
    notify: false,
  },

  NUNJUCKS_OPTIONS: {
    path: [`./src/html`, `./src`],
    manageEnv: nunjucksEnv
  }
};
