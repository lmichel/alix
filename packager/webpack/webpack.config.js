/**
 *  * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/
var webpack = require("webpack");
var global = require("global");
var path = require('path');
new webpack.ProvidePlugin({$:"jquery"})
let ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
		
  mode: 'development',

 target: 'node',
	  node: {
		   fsevents: "empty",
		   fs: "empty",
		   child_process: "empty",
		   //global: false
		},
  entry: __dirname+"/app/Main.js",//The only access file .Only!!!
  output: {
    path:__dirname+"/public",//where to put the bundle file
    filename: "bundle.js",
   // library: "my-library",
   // libraryTarget: "umd"
  },
  externals:{
	     'jquery':'window.jQuery'
	  },
  resolve : {
	    alias: {
	      // bind version of jquery-ui
	      "jquery-ui": "jquery-ui/jquery-ui.js",      
	      // bind to modules;
	      modules: path.join( __dirname, "/node_modules"),
	    }
  },
  module: {
	    rules: [
	    	{
	            test: /global\.js$/,
	            use: [ 'script-loader' ]
	        },
	        {
	            test: /(\.jsx|\.js)$/,
	            use: {
	                loader: "babel-loader",
	                options: {
	                         presets: [
	                             "env", "react"
	                         ]
	                     }
	            },
	            exclude: /node_modules/
	        },
	        {
	        	  test: /\.(gif|png|jpe?g|svg)$/,
	        	  use: [
	        	    'file-loader',
	        	    {
	        	      loader: 'image-webpack-loader',
	        	      options: {
	        	        bypassOnDebug: true, // webpack@1.x
	        	        disable: true, // webpack@2.x and newer
	        	      },
	        	    },
	        	  ],
	        },
	        {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000'
               // loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(svg|eot|woff|ttf)\w*/,
                loader: 'file-loader?outputPath=fonts/&name=[name].[ext]'
            },
            {
                test: /\.xsl$/,
                loader: "file-loader?name=[name].[ext]"
            },
	        {
	        	 test: /\.css$/,
	        	use: ExtractTextPlugin.extract({
	                    fallback: "style-loader",
	                    use: "css-loader"
	                })
	          /* test: /\.css$/,
	            use: [
	                {
	                    loader: "style-loader"
	                },
	                {
	                    loader: "css-loader",
	                    options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
	            ]*/
	        }
	      ],
	     /* loaders: [
	            {
	                test: /\.(png|jpg|gif)$/,
	                loader: 'file-loader?name=images/[name].[ext]'
	            },
	            {
	                test: /\.(svg|eot|woff|ttf)\w*
	                loader: 'file-loader?outputPath=fonts/&name=[name].[ext]'
	            },
	            {
	                test: /\.xsl$/,
	                loader: "file-loader?name=[name].[ext]"
	            }
	        ]*/
     },
     devtool:false,// 'eval-source-map',
     plugins: [
      /*  new webpack.ProvidePlugin({
    		      "$":"jquery",
    		      "jQuery":"jquery",
    		      "window.jQuery":"jquery"
    		    }),*/
       /*   new webpack.optimize.CommonsChunkPlugin({
        	  name : 'common',
              filename : 'js/base.js'
          }),*/
          new ExtractTextPlugin("style_bundle.css"),
        /* new CopyWebpackPlugin([
             {
                 from: 'css/images',
                 to: 'images'
             },
             {
                 from: 'xmlsample',
                 to: 'xmlsample'
             },
             {
                 from: 'js/MathJax',
                 to: 'MathJax'
             }

         ]),
         new CleanWebpackPlugin(
             ['dist'],
             {
                 root: "/home/xshan/gitRepository/AladinLiteX/WebContent",       　　　　　　　　　　// root repository
                 verbose: true,        　　　　　　　　　　//output the message in the console
                 dry: false        　　　　　　　　　　//delete the files
             })*/
     ],
devServer: {
    contentBase: __dirname,//the root repository
    historyApiFallback: true,
    inline: true//refresh
  } 
}
