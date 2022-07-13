const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'
import Category from './Category'

const Product = sequelize.define(
	'Product',
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		category: {
			type: DataTypes.UUID,
			references: {
				model: Category,
				key: 'id',
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageWebp: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isVisible: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 5,
		},
		comments: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
	},
)

export default Product
