'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var webpack = require('webpack');
var path = require('path');
var entry = {
  'demo0-simple-scroller': './demos/demo0-simple-scroller/index.jsx'
};
var loaders = [
    {
        test: /\.jsx?$/
        ,exclude: /(node_modules)/
        ,loader: 'babel'
        ,query: {optional: ['runtime'], stage: 0 }
    }
];
var config =  {
		  entry: entry,
		  output: {
		    filename: '[name]/all.js',
		    publicPath: '/release/',
	        path: __dirname + '/release/',
		  },
		  module: {
		    loaders:loaders,
		  },
		  resolve: {
		    extensions: ['', '.js', '.jsx']
		  }
};
module.exports = config;







