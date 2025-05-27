const fs = require('fs');
const path = require('path');

const babelConfig = require('./babel.config.js');
const metroConfig = require('./metro.config.js');

const projectRoot = __dirname;

// 🔍 Get aliases from Babel
const babelAliases =
  babelConfig.plugins.find(
    (plugin) => Array.isArray(plugin) && plugin[0] === 'module-resolver'
  )?.[1]?.alias || {};

// 🔍 Get aliases from Metro
const metroAliases = metroConfig.resolver?.extraNodeModules || {};

// 📦 Normalize all paths to absolute for fair comparison
const resolveBabelPath = (relativePath) => path.resolve(projectRoot, relativePath);
const resolveMetroPath = (absolutePath) => path.resolve(absolutePath); // in case Metro used things like ../

let hasErrors = false;

console.log('\n🔎 Comparing Babel vs Metro aliases (using resolved paths):\n');

for (const [alias, babelPath] of Object.entries(babelAliases)) {
  const metroPath = metroAliases[alias];

  if (!metroPath) {
    console.error(`❌ Alias "${alias}" exists in Babel but is missing in Metro`);
    hasErrors = true;
    continue;
  }

  const resolvedBabel = resolveBabelPath(babelPath);
  const resolvedMetro = resolveMetroPath(metroPath);

  if (resolvedBabel !== resolvedMetro) {
    console.warn(`⚠️ Alias "${alias}" has different resolved paths:\n  Babel: ${resolvedBabel}\n  Metro: ${resolvedMetro}`);
    hasErrors = true;
  }
}

for (const alias of Object.keys(metroAliases)) {
  if (!babelAliases[alias]) {
    console.error(`❌ Alias "${alias}" exists in Metro but is missing in Babel`);
    hasErrors = true;
  }
}

if (!hasErrors) {
  console.log('✅ All aliases are in sync between Babel and Metro!');
} else {
  console.log('\n💡 Fix these mismatches to keep your dev env tidy!');
}
