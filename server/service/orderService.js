import User from "../models/User";
import Order from "../models/Order";
import jwt from "jsonwebtoken";

class orderService {
  async getAllOrders() {
    const order = await User.find({ roles: "USERS" }).populate({
      path: "orders",
      model: "Order",
    });
    return { order };
  }

  async createOrder(token, fullName, address, allPrice, products) {
    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const order = await Order.create({
      fullName,
      address,
      allPrice,
      products,
      status: "Availability is check",
    });
    const userId = { _id: id };
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
