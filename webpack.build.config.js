'use strict';

var webpack = require('webpack');
var path = require('path');
    var loaders = [
        {
            test: /\.jsx?$/
            ,exclude: /(node_modules)/
            ,loader: 'babel'
            ,query: {optional: ['runtime'], stage: 0 }
        }
    ];
	var config =  {
			  entry: "./src/index",
			  output: {
			    filename: '/index.js',
			    publicPath: '/libs/',
		        path: __dirname + '/libs/',
			  },
			  module: {
			    loaders:loaders,
			  },
			  resolve: {
			    extensions: ['', '.js', '.jsx']
			  }
	};
module.exports = config;
