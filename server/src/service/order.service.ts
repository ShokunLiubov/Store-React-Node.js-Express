import Order from "../models/Order.model"
import Products from "../models/Products.model"
import User from "../models/User.model"

class orderService {

  async createOrder(payload, userId) {

    const { fullName, address, allPrice, products } = payload

    const order = await Order.create({
      fullName,
      address: {
        city: address.city,
        street: address.street,
        postOffice: address.postOffice,
      },
      allPrice,
      products,
    })

    products.map(async (product) => {

      return await Products.findByIdAndUpdate(
        { _id: product.productId },
        {
          $inc: {
            count: -product.count
          }
        }
      )
    })



    const userUpdate = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { orders: order._id },
      },
      { new: true, useFindAndModify: false },
    )
    return { order, userUpdate }
  }
}

export default new orderService()
