var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: 'source-map',
	entry: [
		'rxjs',
		'zone.js',
		'reflect-metadata',
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		'whatwg-fetch',
		'./src/app/main.ts'
	],
	output: {
		path: './dist',
		filename: 'app.bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/app/index.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("styles.css")
	],
	resolve: {
		extensions: ['', '.js', '.ts', '.css', '.html']
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: [ 'ts', 'angular2-template-loader' ],
				exclude: /node_modules\/(?!(ng2-.+))/
			},
			{
				test: /\.css$/,
				loaders: ["to-string-loader", "css-loader"]
			},
			{
				test: /\.html$/,
				loader: 'raw-loader',
				exclude: ['./index.html']
			}
		]
	}
}
