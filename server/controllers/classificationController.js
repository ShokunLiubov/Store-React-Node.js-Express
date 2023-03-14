import Classification from '../models/Classification'

class classificationController {

    async getAllClassification(req, res, next) {
        try {
            const classifications = await Classification.find({}).select('name slug')

            return res.status(200).json(classifications)
        } catch (e) {
            console.error(e.message)
        }
    }
}

export default new classificationController()
