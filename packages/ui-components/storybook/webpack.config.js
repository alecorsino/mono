const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  let {resolve, module} = defaultConfig;

  //Adding alias to use the package name instead of relative path  
  let alias = {
      ['@brainglitch\/ui-components']:path.resolve(__dirname, '../lib/'),
      UI:path.resolve(__dirname, '../lib/main.js')
  };

  resolve.alias = Object.assign(resolve.alias, alias);

  //TypeScript
  module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader'),
  });
  resolve.extensions.push('.ts', '.tsx','js');

  return defaultConfig;
};