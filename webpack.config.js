var path = require('path');
var webpack = require('webpack');


module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			// css *** sass/scss
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}

		]
	}



}