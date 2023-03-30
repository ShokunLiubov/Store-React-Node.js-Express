import Delivery from '../models/Delivery'

class deliveryController {

    async getDeliveryOptions(req, res, next) {
        try {
            const deliveryOptions = await Delivery.find({}).select('deliveryType price name')

            return res.status(200).json(deliveryOptions)
        } catch (error) {
            console.error('Error getting delivery options:', error)
            return null
        }
    }

    async updateDeliveryOptions(req, res, next) {
        try {
            const { _id, price } = req.body

            const updateDeliveryOption = await Delivery.findByIdAndUpdate(_id, { price })

            return res.status(201).json(updateDeliveryOption)
        } catch (error) {
            console.error('Error getting delivery options:', error)
            return null
        }
    }

}

export default new deliveryController()