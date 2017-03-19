const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HappyPack = require('happypack');

let plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
  }),
  new HappyPack({
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  }),
  new ManifestPlugin({
    fileName: '../../_data/webpack.json',
    basePath: '/js/build/',
  }),
  new webpack.ProvidePlugin({
    jQuery: 'jquery/dist/jquery.slim.js',
    $: 'jquery/dist/jquery.slim.js',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1;
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new webpack.NamedModulesPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
}

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'source-map',
  entry: {
    common: './js/src/common.js',
    documentation: './js/src/documentation.js',
    install: './js/src/install.js',
    nightly: './js/src/nightly.js',
    packages: './js/src/packages.js',
    package: './js/src/package.js',
  },
  output: {
    path: './js/build',
    filename: process.env.NODE_ENV === 'production'
      ? '[name].[chunkhash].js'
      : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader'],
        include: [
          path.join(__dirname, 'js/src'),
          // bootstrap 4 also has js/dist but those files are not requireable
          path.join(__dirname, 'node_modules/bootstrap/js/src'),
        ],
      },
    ],
  },
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.slim.js',
    },
  },
  plugins,
  stats: 'minimal',
};
