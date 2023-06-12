import { NextFunction, Request, Response } from 'express'
import Products from '../models/Products.model'

class storeController {

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {

            const home = await Products.aggregate([
                // Group products by category
                { $group: { _id: '$category', products: { $push: '$$ROOT' } } },
                // Populate 'category' field from linked collection
                { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
                // Add 'slug' field to 'category' object
                { $addFields: { 'category.slug': { $arrayElemAt: ['$category.slug', 0] } } },
                // Project fields for output
                { $project: { _id: 0, name: { $arrayElemAt: ['$category.name', 0] }, slug: { $arrayElemAt: ['$category.slug', 0] }, products: 1 } },
                // Limit products to three per category
                { $project: { name: 1, slug: 1, products: { $slice: ['$products', 3] } } },
                // Match categories with three or more products
                { $match: { $expr: { $gte: [{ $size: '$products' }, 3] } } }
            ])

            return res.status(200).json(home)
        } catch (e) {
            console.error(e)
        }
    }

}

export default new storeController()