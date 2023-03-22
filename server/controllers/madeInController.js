import Products from '../models/Products'

class madeInController {

    async getAllMadeIn(req, res, next) {

        try {
            const madeIn = await Products.aggregate([
                { $group: { _id: '$made_in' } },
                { $group: { _id: null, made_in: { $push: '$_id' } } },
                { $project: { _id: 0, uniqueMadeIn: '$made_in' } }
            ])

            return res.status(200).json(madeIn[0].uniqueMadeIn)
        } catch (e) {
            console.error(e.message)
        }
    }

}

export default new madeInController()