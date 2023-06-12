import { NextFunction, Request, Response } from 'express'
import Delivery from '../models/Delivery.model'

class deliveryController {

    async getDeliveryOptions(req: Request, res: Response, next: NextFunction)  {
        try {
            const deliveryOptions = await Delivery.find({}).select('deliveryType price name')

            return res.status(200).json(deliveryOptions)
        } catch (error) {
            console.error('Error getting delivery options:', error)
            return null
        }
    }

    async updateDeliveryOptions(req: Request, res: Response, next: NextFunction)  {
        try {
            const { id, price } = req.body

            const updateDeliveryOption = await Delivery.findByIdAndUpdate(id, { price })

            return res.status(201).json(updateDeliveryOption)
            
        } catch (error) {
            console.error('Error getting delivery options:', error)
            return null
        }
    }

}

export default new deliveryController()