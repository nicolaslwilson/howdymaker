const path = require('path');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	plugins: [],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
			]
			},
		    {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
					presets: ['env']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				'file-loader'
				]
			}
		]
	},
	resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};

