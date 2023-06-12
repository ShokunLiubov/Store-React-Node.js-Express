import { NextFunction, Request, Response } from 'express'
import Products from '../models/Products.model'

class madeInController {

    async getAllMadeIn(req: Request, res: Response, next: NextFunction) {

        try {
            const madeIn = await Products.aggregate([
                { $group: { _id: '$made_in' } },
                { $group: { _id: null, made_in: { $push: '$_id' } } },
                { $project: { _id: 0, uniqueMadeIn: '$made_in' } }
            ])

            return res.status(200).json(madeIn[0].uniqueMadeIn)
            
        } catch (e: any) {
            console.error(e.message)
        }
    }

}

export default new madeInController()