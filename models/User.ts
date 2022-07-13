const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'

const User = sequelize.define(
	'User',
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('manage', 'user'),
			allowNull: false,
			defaultValue: 'user',
			validate: {
				isIn: [['manage', 'user']],
			},
		},
	},
	{
		timestamps: true,
	},
)

export default User
