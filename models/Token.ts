const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'
import User from './User'

const Token = sequelize.define(
	'Token',
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		user: {
			type: DataTypes.UUID,
			references: {
				model: User,
				key: 'id',
			},
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	},
)

export default Token
