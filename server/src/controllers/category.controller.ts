import { NextFunction, Request, Response } from 'express'
import Category from '../models/Category.model'

class categoryController {
	async getAllCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await Category.find({}).select('name slug')

			return res.status(200).json(categories)
		} catch (e) {
			console.error(e)
		}
	}
}

export default new categoryController()
