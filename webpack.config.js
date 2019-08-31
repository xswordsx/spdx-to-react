module.exports = {
	entry: './index.jsx',
	output: {
		library: 'spdx-to-react',
		libraryTarget: 'umd',
		filename: 'spdx-to-react.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	externals: {
		// This is here because webpack tries to resolve a dev
		// dependency which requires 'fs'
		fs: 'fs',
	},
};
