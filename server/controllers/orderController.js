import Order from '../models/Order'
import orderService from "../service/orderService"

class orderController {

  async getOrders(req, res, next) {

    try {
      const { page, limit, sortField, sortOrder, search, createdAt, status, price, city } = req.query

      const filters = {}

      if (search) {
        filters.fullName = new RegExp(`${search}`, "i")
      }
      if (status) {
        const statusSelect = status.split(',')
        filters.status = { $in: statusSelect }
      }
      if (city) {
        const citySelect = city.split(',')
        filters.address.city = { $in: 'Rock Hill' }
      }
      if (createdAt) {
        const { startDate, endDate, } = createdAt
        filters.createdAt = { $gte: startDate, $lte: endDate }
      }
      if (price) {
        const { $gte, $lte } = price
        filters.allPrice = { $gte, $lte }
      }

      const orders = await Order.paginate(filters, { page, limit, sort: [[sortField, sortOrder]] })

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
