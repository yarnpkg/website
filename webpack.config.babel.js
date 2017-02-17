import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import HappyPack from 'happypack';

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
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  );
}

export default {
  devtool: process.env.NODE_ENV === 'production'
    ? 'source-map'
    : 'cheap-module-eval-source-map',
  entry: {
    common: './js/src/common.js',
    documentation: './js/src/documentation.js',
    install: './js/src/install.js',
    nightly: './js/src/nightly.js',
    packages: './js/src/packages.js',
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
        exclude: /node_modules/,
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
