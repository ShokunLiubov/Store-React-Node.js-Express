import { NextFunction, Request, Response } from 'express'
import Products from '../models/Products.model'

class countryTMController {
	async getAllCountryTM(req: Request, res: Response, next: NextFunction) {
		try {
			const countryTM = await Products.aggregate([
				{ $group: { _id: '$country_of_TM' } },
				{ $group: { _id: null, country_of_TM: { $push: '$_id' } } },
				{ $project: { _id: 0, uniqueCountryTM: '$country_of_TM' } },
			])

			return res.status(200).json(countryTM[0].uniqueCountryTM)
		} catch (e) {
			console.error(e)
		}
	}
}

export default new countryTMController()
