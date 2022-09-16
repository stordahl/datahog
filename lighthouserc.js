const url = [
  'https://example.com',
];

module.exports = {
  ci: {
    collect: {
      url,
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
