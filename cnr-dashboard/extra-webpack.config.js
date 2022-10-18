const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const path = require('path');

module.exports = (config, options) => {
  config.externals = ["@cnr-styleguide/styles"];
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};

