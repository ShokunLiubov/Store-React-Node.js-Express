import { NextFunction, Request, Response } from 'express'
import Products from '../models/Products.model'

class typeAromaController {

    async getAllTypeAroma(req: Request, res: Response, next: NextFunction) {
        try {
            const typeAroma = await Products.aggregate([
                { $group: { _id: '$type_of_aroma' } },
                { $group: { _id: null, type_of_aroma: { $push: '$_id' } } },
                { $project: { _id: 0, uniqueTypeAroma: '$type_of_aroma' } }
            ])

            return res.status(200).json(typeAroma[0].uniqueTypeAroma)
        } catch (e) {
            console.error(e)
        }
    }

}

export default new typeAromaController()