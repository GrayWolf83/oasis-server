import express from 'express'
import Product from '../../models/Product'
import ManageAuth from '../../middleware/manage.middleware'
import Auth from '../../middleware/auth.middleware'
import Order from '../../models/Order'
import OrderProduct from '../../models/OrderProduct'
const { Op } = require('sequelize')

const router = express.Router()

router.get('/', Auth, async (req, res) => {
	const { user } = req.body
	try {
		const orders = await Order.findAll({
			where: { user: user.id },
			include: [
				{
					model: OrderProduct,
					attributes: ['id', 'count'],
					include: {
						model: Product,
						attributes: [
							'name',
							'description',
							'price',
							'image',
							'imageWebp',
						],
					},
				},
			],
		})

		res.status(200).send(orders)
	} catch (error) {
		console.log(error)
	}
})

router.get('/activeOrders', ManageAuth, async (req, res) => {
	try {
		const orders = await Order.findAll({
			where: {
				status: {
					[Op.or]: ['start', 'cooking', 'delivery'],
				},
			},
			include: [
				{
					model: OrderProduct,
					attributes: ['id', 'count'],
					include: {
						model: Product,
						attributes: [
							'name',
							'description',
							'price',
							'image',
							'imageWebp',
						],
					},
				},
			],
		})

		res.status(200).send(orders)
	} catch (error) {
		console.log(error)
	}
})

router.get('/archiveOrders', ManageAuth, async (req, res) => {
	try {
		const orders = await Order.findAll({
			where: {
				status: 'end',
			},
			include: [
				{
					model: OrderProduct,
					attributes: ['id', 'count'],
					include: {
						model: Product,
						attributes: [
							'name',
							'description',
							'price',
							'image',
							'imageWebp',
						],
					},
				},
			],
		})

		res.status(200).send(orders)
	} catch (error) {
		console.log(error)
	}
})

router.post('/', Auth, async (req, res) => {
	try {
		const { user, price, name, phone, address, orderProducts } = req.body
		const order = await Order.create({
			user: user.id || null,
			price,
			name,
			phone,
			address,
		})

		const ordProds = orderProducts.map((item) => ({
			...item,
			OrderId: order.id,
		}))

		await OrderProduct.bulkCreate(ordProds)

		res.status(200).send()
	} catch (error) {
		console.log(error)
	}
})

export default router
