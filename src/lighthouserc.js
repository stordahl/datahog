const config = require('../datahog.config')

module.exports = {
  ci: {
    collect: {
			url: config.urls,
      configPath: "./lighthouse-config.js",
      numberOfRuns: config.runs,
      settings: {
        output: config.output,
        onlyCategories: ['performance'],
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
