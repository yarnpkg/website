const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    common: './js/src/common.js',
    documentation: './js/src/documentation.js',
    install: './js/src/install.js',
    nightly: './js/src/nightly.js',
    search: './js/src/search.js',
  },
  output: {
    path: './js/build',
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
  },
  // resolve: {
  //   alias: {
  //     'react': 'preact-compat',
  //     'react-dom': 'preact-compat',
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ManifestPlugin({
      fileName: '../../_data/webpack.json',
      basePath: '/js/build/'
    })
  ]
}
