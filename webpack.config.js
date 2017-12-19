const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HappyPack = require('happypack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [
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
    // this assumes your vendor imports exist in the node_modules directory
    minChunks: module =>
      module.context && module.context.includes('node_modules'),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new webpack.NamedModulesPlugin(),
];

if (process.env.NODE_ENV === 'debug') {
  plugins.push(new BundleAnalyzerPlugin());
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
}

module.exports = {
  devtool:
    process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-source-map',

  context: path.resolve(__dirname, 'js/src'),

  entry: {
    common: './common.js',
    documentation: './documentation.js',
    install: './install.js',
    nightly: './nightly.js',
    packages: './packages.js',
    package: './package.js',
  },
  output: {
    path: path.resolve(__dirname, 'js/build'),
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name].[chunkhash].js'
        : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader'],
        include: [
          path.resolve(__dirname, 'js/src'),
          // bootstrap 4 also has js/dist but those files are not requireable
          path.resolve(__dirname, 'node_modules/bootstrap/js/src'),
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
