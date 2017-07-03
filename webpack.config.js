const path = require('path');

module.exports = {
	entry: './index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'spdx-to-react.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						'es2015',
						'react'
					],
				}
			}
		]
	},
	externals: {
		// This is here because webpack tries to resolve a dev dependency which
		// requires 'fs'
		fs: 'fs'
	}
};
