import orderFilters from '../filters/orderFilters'
import Order from '../models/Order'
import orderService from "../service/orderService"

class orderController {

  async getOrders(req, res, next) {

    try {
      const { page, limit, sortField, sortOrder } = req.query

      const filters = await orderFilters.orderFilters(req.query)

      const orders = await Order.paginate(filters, { page, limit, sort: [[sortField, sortOrder]] })

      return res.status(200).json(orders)
    } catch (e) {
      console.log(e)
    }
  }

  async createOrders(req, res, next) {

    try {
      const userId = { _id: req.id }
      const order = await orderService.createOrder(req.body, userId)

      return res.status(201).json(order)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new orderController()
