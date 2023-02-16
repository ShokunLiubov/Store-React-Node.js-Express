import orderService from "../service/orderService"

class orderController {

  async getOrders(req, res, next) {

    try {
      // const orders = await User.find({ roles: "USERS" }).populate({
      //   path: "orders",
      //   model: "Order",
      // })

      const { page, limit } = req.query
      const orders = await User.paginate({ roles: "USERS" }, {
        page, limit, populate: {
          path: "orders",
          model: "Order",
        }
      })

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
