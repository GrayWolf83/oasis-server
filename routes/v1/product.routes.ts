import express from 'express'
import Product from '../../models/Product'
import imageMiddleware from '../../middleware/image'
import imageToWebp from '../../middleware/imageWebp'
import deleteImage from '../../utils/deleteImage'
import ManageAuth from '../../middleware/manage.middleware'
import IProduct from '../../types/product'

const router = express.Router()

router.get('/:category', async (req, res) => {
	const { category } = req.params
	try {
		const products: IProduct[] = await Product.findAll({
			where: { category },
		})

		res.status(200).send(products)
	} catch (error) {
		console.log(error)
	}
})

router.post(
	'/',
	ManageAuth,
	imageMiddleware.single('image'),
	imageToWebp,
	async (req, res) => {
		try {
			const { name, image, category, price, imageWebp, description } =
				req.body

			const product: IProduct = await Product.create({
				name,
				category,
				price,
				description,
				image,
				imageWebp,
			})

			res.status(201).send(product)
		} catch (error) {
			console.log(error)
		}
	},
)

router.patch(
	'/:id',
	ManageAuth,
	imageMiddleware.single('image'),
	imageToWebp,
	async (req, res) => {
		const id = req.params.id
		const { name, category, price, description, image, imageWebp } =
			req.body
		try {
			const oldProduct: IProduct = await Product.findOne({
				where: { id },
			})

			if (!image || !imageWebp) {
				const product = await Product.update(
					{ name, category, price, description },
					{ where: { id } },
				)

				res.status(200).send(product)
			} else {
				deleteImage(oldProduct.image)
				deleteImage(oldProduct.imageWebp)

				const product: IProduct = await Product.update(
					{ name, category, price, description, image, imageWebp },
					{ where: { id } },
				)

				res.status(200).send(product)
			}
		} catch (error) {
			console.log(error)
		}
	},
)

router.patch('/changeVisible/:id', ManageAuth, async (req, res) => {
	const id = req.params.id
	try {
		const old: IProduct = await Product.findOne({ where: { id } })

		await Product.update({ isVisible: !old.isVisible }, { where: { id } })

		const product: IProduct = await Product.findOne({ where: { id } })

		res.status(200).send(product)
	} catch (error) {
		console.log(error)
	}
})

router.delete('/:id', ManageAuth, async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findOne({
			where: { id },
		})

		if (product) {
			deleteImage(product.image)
			deleteImage(product.imageWebp)

			await Product.destroy({
				where: { id },
			})

			res.status(200).send(id)
		}
	} catch (error) {
		console.log(error)
	}
})

export default router
