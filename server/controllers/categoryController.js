import Category from '../models/Category'

class categoryController {

    async getAllCategory(req, res, next) {
        try {
            const categories = await Category.find({}).select('name slug')

            return res.status(200).json(categories)
        } catch (e) {
            console.error(e.message)
        }
    }

}

export default new categoryController()
