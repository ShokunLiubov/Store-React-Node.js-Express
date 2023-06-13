import { NextFunction, Request, Response } from 'express'
import orderFilters from '../filters/order.filters'
import Order from '../models/Order.model'
import orderService from "../service/order.service"
import { IReqIsAuth } from '../types/auth.interface'

class orderController {

  async getOrders(req: Request, res: Response, next: NextFunction) {

    try {
      const { page = 1, limit = 20, sortField, sortOrder } = req.query

      const filters = await orderFilters.orderFilters(req.query)

      const orders = await Order.paginate(filters, { page: +page, limit: +limit, sort: [[sortField, sortOrder]] })

      return res.status(200).json(orders)
      
    } catch (e) {
      console.log(e)
    }
  }

  async createOrders(req: IReqIsAuth, res: Response, next: NextFunction) {

    try {
      const userId = { id: req.id }
      const order = await orderService.createOrder(req.body, userId)

      return res.status(201).json(order)
    } catch (e) {
      console.log(e)
    }
  }

  async getCity(req: Request, res: Response, next: NextFunction) {

    try {
      const city = await Order.aggregate([
        { $group: { _id: '$address.city' } },
        { $group: { _id: null, uniqueCity: { $push: '$_id' } } },
        { $project: { _id: 0, uniqueCity: 1 } }
      ])

      return res.status(200).json(city[0].uniqueCity)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new orderController()
