const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'
import OrderProduct from './OrderProduct'
import User from './User'

const Order = sequelize.define(
	'Order',
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		user: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: User,
				key: 'id',
			},
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('start', 'delivery', 'end'),
			allowNull: false,
			defaultValue: 'start',
			validate: {
				isIn: [['start', 'delivery', 'end']],
			},
		},
	},
	{
		timestamps: true,
	},
)

export default Order
