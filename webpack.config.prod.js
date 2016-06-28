const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        TARGET: '"web"',
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ContextReplacementPlugin(/.*$/, /NEVER_MATCH^/),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr',
      },
    ],
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
    },
  },
};
