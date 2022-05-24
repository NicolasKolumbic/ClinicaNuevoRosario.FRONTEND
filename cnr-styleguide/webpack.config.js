const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cnr-styleguide",
    projectName: "styles",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    
  });
};
