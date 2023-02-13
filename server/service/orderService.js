import User from "../models/User";
import Order from "../models/Order";
import Products from "../models/Products";

class orderService {

  async createOrder(payload) {

    const { fullName, address, allPrice, products } = payload;

    const order = await Order.create({
      fullName,
      address: {
        city: address.city,
        street: address.street,
        postOffice: address.postOffice,
      },
      allPrice,
      products,
      status: "Availability is check",
    });

    products.map(async (product) => {

      return await Products.findByIdAndUpdate(
        { _id: product.productId },
        {
          $inc: {
            count: -product.count
          }
        }
      );
    })

    const userId = { _id: req.id };

    const userUpdate = await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: order._id },
      },
      { new: true, useFindAndModify: false },
    );

    return { order, userUpdate };
  }
}

export default new orderService();
