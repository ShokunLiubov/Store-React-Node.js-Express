var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Products from '../models/Products.model';
class storeController {
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const home = yield Products.aggregate([
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
                ]);
                return res.status(200).json(home);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
export default new storeController();
