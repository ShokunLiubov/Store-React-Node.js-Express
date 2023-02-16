import Order from '../models/Order'
import orderService from "../service/orderService"

class orderController {

  async getOrders(req, res, next) {

    try {
      const { page, limit } = req.query
      const orders = await Order.paginate({}, { page, limit, sort: { id: 'desc' } })

      return res.json(orders)

    } catch (e) {
      console.log(e)
    }
  }

  async createOrders(req, res, next) {

    try {
      const order = await orderService.createOrder(req.body)

      return res.status(201).json(order)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new orderController()
