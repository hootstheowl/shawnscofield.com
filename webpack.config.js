const { resolve, join } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FontelloWebpackPlugin = require('fontello-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fontelloConfig = require('./fontello.config.json');

module.exports = {
  devtool: 'cheap-source-map',
  context: resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve(__dirname, 'src', 'js')],
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        include: [resolve(__dirname, 'src', 'stylesheets')],
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets',
              publicPath: './dist/assets',
            },
          },
        ],
      },
      {
        test: /\.modernizrrc$/,
        use: ['modernizr-loader', 'json-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new FontelloWebpackPlugin({
      config: fontelloConfig,
    }),
    new HtmlWebpackPlugin({
      favicon: 'assets/favicon.ico',
      template: 'assets/index.ejs',
      inject: 'body',
    }),
  ],
  resolve: {
    alias: {
      modernizr$: resolve(__dirname, '.modernizrrc'),
    },
  },
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
