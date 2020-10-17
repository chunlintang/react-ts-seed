const { resolve } = require('path')
const { isDev, APP_PATH } = require('../constants')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { context } = require('./webpack.dev')
const { dir } = require('console')

const getCssLoaders = (importLoaders) => [
	'style-loader',
	{
		loader: 'css-loader',
		options: {
			modules: false,
			sourceMap: isDev,
			importLoaders,
		},
	},
	{
		loader: 'postcss-loader',
		options: {
			indent: 'postcss',
			plugins: [
				require('postcss-flexbugs-fixes'),
				require('postcss-preset-env')({ autoprefixer: { grid: true, flexbox: 'no-2009' }, stage: 3 }),
				require('postcss-normalize'),
			],
			sourceMap: isDev,
		},
	},
]

module.exports = {
	entry: {
		app: resolve(APP_PATH, './src/index.tsx'),
	},
	output: {
		filename: `js/[name]${isDev ? '' : '.[hash:32]'}.js`,
		path: resolve(APP_PATH, './dist'),
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			Src: resolve(APP_PATH, './src'),
			Components: resolve(APP_PATH, './src/components'),
			Utils: resolve(APP_PATH, './src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: getCssLoaders(1),
			},
			{
				test: /\.less$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'less-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'scss-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10 * 1024, //10M
							name: '[name].[contenthash].[ext]',
							outputPath: 'assets/images',
						},
					},
				],
			},
			{
				test: [/\.(ttf|woff|woff2|eot|otf)$/],
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[contenthash].[ext]',
							outputPath: 'assets/fonts',
						},
					},
				],
			},
			{
				test: [/\.tsx?|js$/],
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
				exclude: '/node_modules/',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(APP_PATH, './public/index.html'),
			filename: 'index.html',
			cache: false,
			minify: isDev
				? false
				: {
						removeAttributeQuotes: true,
						collapseWhitespace: true,
						removeComments: true,
						collapseBooleanAttributes: true,
						collapseInlineTagWhitespace: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true,
						useShortDoctype: true,
				  },
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					context: resolve(APP_PATH, './public'),
					from: '*',
					to: resolve(APP_PATH, './dist'),
					toType: 'dir',
				},
			],
		}),
	],
}
