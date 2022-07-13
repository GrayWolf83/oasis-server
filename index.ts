const express = require('express')
import log4js from 'log4js'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import sequelize from './utils/database'
require('dotenv').config()
const routesV1 = require('./routes/v1')

const logger = log4js.getLogger()
logger.level = process.env.LOG_LEVEL

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', routesV1)

const port = process.env.PORT
async function start() {
	try {
		await sequelize.sync()
		app.listen(port, () => {
			console.log(`Сервер запущен, порт ${port}`)
		})
	} catch (error) {
		logger.error(error)
	}
}

start()
