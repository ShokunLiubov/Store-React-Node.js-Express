import Products from '../models/Products'

class countryTMController {

    async getAllCountryTM(req, res, next) {
        try {
            const countryTM = await Products.aggregate([
                { $group: { _id: '$country_of_TM' } },
                { $group: { _id: null, country_of_TM: { $push: '$_id' } } },
                { $project: { _id: 0, uniqueCountryTM: '$country_of_TM' } }
            ])

            return res.status(200).json(countryTM[0].uniqueCountryTM)
        } catch (e) {
            console.error(e.message)
        }
    }

}

export default new countryTMController()