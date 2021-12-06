// Backpack / saddlebag node module regexes
const backpackModulesRegex = /node_modules[\\/]bpk-/;
const saddlebagModulesRegex = /node_modules[\\/]saddlebag-/;
const scopedBackpackModulesRegex = /node_modules[\\/]@skyscanner[\\/]bpk-/;

const babelLoader = require.resolve("babel-loader");

module.exports = {
  webpack: function (config) {
    // find babel config
    const rules = config.module.rules;
    const oneOfRule = rules.find((rule) => rule.oneOf);

    if (oneOfRule) {
      const babelRule = oneOfRule.oneOf.find(
        (rule) => rule.loader === babelLoader
      );

      // add backpack / saddlebag node module regexes
      if (babelRule) {
        babelRule.include = [
          babelRule.include,
          backpackModulesRegex,
          saddlebagModulesRegex,
          scopedBackpackModulesRegex,
        ];
        updated = true;
      }
    }

    if (!updated) {
      throw Error(
        "Could not find babel-loader rule to modify with backpack regexes"
      );
    }

    return config;
  },
};
