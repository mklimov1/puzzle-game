/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require(`webpack-merge`);
const common = require(`./common.config`);
const paths = require(`./paths`);

module.exports = merge(common, {
  mode: `production`,
  devtool: false,
  output: {
    path: paths.dist,
    filename: `[name].bundle.js`,
  },
});
