const path = require('path');
const babelConfig = require('./babel.config');

const alias =
  babelConfig.plugins.find(
    (plugin) => Array.isArray(plugin) && plugin[0] === 'module-resolver'
  )?.[1]?.alias || {};

const extraNodeModules = Object.fromEntries(
  Object.entries(alias).map(([key, relPath]) => [
    key,
    path.resolve(__dirname, relPath),
  ])
);

module.exports = {
  resolver: {
    extraNodeModules,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
