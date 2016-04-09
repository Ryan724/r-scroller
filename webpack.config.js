'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

require('babel/polyfill');

var webpack = require('webpack');
var path = require('path');


module.exports = function(options){
	var entry = {
	  'demo0-simple-scroller': './demos/demo0-simple-scroller/index.jsx'
	};
	//启动服务
	var devServer = {
		contentBase: "./demos"
		,host: "localhost"
		,port: "8080"
		,inline: true
		,colors: true
	}
    var loaders = [
        {
            test: /\.jsx?$/
            ,exclude: /(node_modules)/
            ,loader: 'babel'
            ,query: {optional: ['runtime'], stage: 0 }
        }
    ];
	return {
			  devtool:options.devtool,
			  entry: entry,
			  output: {
			    filename: '[name]/all.js'
			  },
			  module: {
			    loaders:loaders,
			  },
			  resolve: {
			    extensions: ['', '.js', '.jsx']
			  },
		  	devServer: devServer,//开发服务器配置
	  		// plugins: plugins
	};
}
