const path = require('path')

const APP_PATH = path.resolve(__dirname, '../')
const APP_NAME = path.parse(APP_PATH).name
const isDev = process.env.NODE_ENV !== 'production'
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

module.exports = {
	APP_NAME,
	APP_PATH,
	isDev,
	SERVER_HOST,
	SERVER_PORT,
}
