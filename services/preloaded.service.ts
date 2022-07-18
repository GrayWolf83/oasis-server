import ICategory from '../types/category'
import Category from '../models/Category'

async function Preloaded() {
	try {
		const noneCategory: ICategory = await Category.findOne({
			where: { name: 'Без категории' },
		})

		if (!noneCategory) {
			await Category.create({
				name: 'Без категории',
				image: 'none',
				imageWebp: 'none',
			})
		}
	} catch (error) {}
}

export default Preloaded
