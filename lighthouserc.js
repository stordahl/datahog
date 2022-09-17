const config = require('./datahog.config')

module.exports = {
  ci: {
    collect: {
			url: config.urls,
      configPath: "./lighthouse-config.js",
      numberOfRuns: 1,
      settings: {
        output: ['json'],
        //throttlingMethod: 'devtools',
        onlyCategories: ['performance'],
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
