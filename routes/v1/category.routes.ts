import express from 'express'
import ICategory from '../../types/category'
import Category from '../../models/Category'
import imageMiddleware from '../../middleware/image'
import imageToWebp from '../../middleware/imageWebp'
import deleteImage from '../../utils/deleteImage'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const categories: ICategory[] = await Category.findAll()

		res.status(200).send(categories)
	} catch (error) {
		console.log(error)
	}
})

router.post(
	'/',
	imageMiddleware.single('image'),
	imageToWebp,
	async (req, res) => {
		try {
			const { name, image, imageWebp } = req.body

			const hasCategory = await Category.findOne({ where: { name } })

			if (hasCategory) {
				deleteImage(image)
				deleteImage(imageWebp)

				return res.status(400).send({
					message: `Категория ${name} уже существует`,
					code: 400,
				})
			}

			const category: ICategory = await Category.create({
				name,
				image,
				imageWebp,
			})

			res.status(201).send(category)
		} catch (error) {
			console.log(error)
		}
	},
)

export default router
