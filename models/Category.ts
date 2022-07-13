const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'

const Category = sequelize.define(
	'Category',
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
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageWebp: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	},
)

export default Category
