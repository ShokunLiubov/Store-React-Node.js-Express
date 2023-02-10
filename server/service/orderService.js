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
}

export default new orderService();
