import Products from '../models/Products'

class typeAromaController {

    async getAllTypeAroma(req, res, next) {
        try {
            const typeAroma = await Products.aggregate([
                { $group: { _id: '$type_of_aroma' } },
                { $group: { _id: null, type_of_aroma: { $push: '$_id' } } },
                { $project: { _id: 0, uniqueTypeAroma: '$type_of_aroma' } }
            ])

            return res.status(200).json(typeAroma[0].uniqueTypeAroma)
        } catch (e) {
            console.error(e.message)
        }
    }

}

export default new typeAromaController()