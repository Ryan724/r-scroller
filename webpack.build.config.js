'use strict';

var webpack = require('webpack');
var path = require('path');
var loaders = [{
	test: /\.(js|jsx)/,
	exclude: /(node_modules)/,
	loader: 'babel',
	query: {optional: ['runtime'], stage: 0 }

}];
var config = {
	entry: "./src/index",
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: 'build/',
		filename: 'r-scroller.js',
		library: 'ReactScroller',
		libraryTarget: 'umd'
	},
	module: {
		loaders: loaders,
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	externals: {
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	}
};
module.exports = config;