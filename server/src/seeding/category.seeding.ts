import Category from '../models/Category.model'

class seedingCategory {
	async createCategory() {
		try {
			const category = [
				{ name: 'Perfumery', slug: 'perfumery' },
				{ name: 'Hair', slug: 'hair' },
				{ name: 'Face', slug: 'face' },
				{ name: 'Makeup', slug: 'makeup' },
				{ name: 'To men', slug: 'to-men' },
				{ name: 'Health & Care', slug: 'health&care' },
				{ name: 'Gifts', slug: 'gifts' },
				{ name: 'Clothes', slug: 'clothes' },
			]
			for (let i = 0; i < category.length; i++) {
				await Category.create(category[i])
			}
		} catch (e) {
			console.log(e)
		}
	}
}
export default new seedingCategory()
