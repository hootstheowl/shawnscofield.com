const webpack = require('webpack');
const config = require('./webpack.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = Object.assign({}, config, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJSPlugin({ parallel: true })
		]
	}
});
