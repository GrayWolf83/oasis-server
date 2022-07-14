const { Sequelize, DataTypes } = require('sequelize')
import sequelize from '../utils/database'
import Order from './Order'
import Product from './Product'

const OrderProduct = sequelize.define(
	'OrderProduct',
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		OrderId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Order,
				key: 'id',
			},
		},
		ProductId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Product,
				key: 'id',
			},
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	},
)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)
Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

export default OrderProduct
