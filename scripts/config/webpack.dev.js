const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { SERVER_HOST, SERVER_PORT } = require('../constants')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		host: SERVER_HOST,
		port: SERVER_PORT,
		stats: 'errors-only', // 终端仅打印 error
		clientLogLevel: 'silent', // 日志等级
		compress: true, // 启用gzip压缩
		open: true, //打开默认浏览器
		hot: true, // 热更新
	},
})
