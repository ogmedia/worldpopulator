var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    entry: "./src/app.js",
 //   mode:"development",
    devtool: 'inline-source-map',
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    plugins: [
    	new HtmlWebpackPlugin({ template: './public/index.html' }),
	    new CopyWebpackPlugin([ { from: './src/assets', to: __dirname + '/dist/assets' } ])
    ],
    devServer: {
  		contentBase: __dirname + "/dist",
  		compress: true,
  		port: 8080
	},
	module:{
		rules:[
		// {
		// 	test: __dirname + './lib/orbitControl.js',
		// 	use:"imports-loader?THREE=three"
		// },
		// {
		// 	test: require.resolve('./lib/orbitControl.js'),
		// 	use:"imports-loader?this=>window"
		// }
		]
	},
	resolve: {
  		alias: {
    		'lib/orbitControl.js': path.join(__dirname, './lib/orbitControl.js')
  		}
	}
};