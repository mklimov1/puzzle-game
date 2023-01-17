/* eslint-disable @typescript-eslint/no-var-requires */
const { merge, } = require(`webpack-merge`);
const webpack = require(`webpack`);
const common = require(`./common.config`);

module.exports = merge(common, {
  mode: `development`,
  devtool: `inline-source-map`,
  devServer: {
    host: `0.0.0.0`,
    historyApiFallback: true,
    open: false,
    compress: false,
    hot: true,
    client: {
      overlay: true,
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
