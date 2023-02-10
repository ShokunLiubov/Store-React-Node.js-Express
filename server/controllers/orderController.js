import orderService from "../service/orderService";
import AuthError from "../exception/authError";
import Order from "../models/Order";
import User from "../models/User";
import jwt from "jsonwebtoken";
import Products from "../models/Products";

class orderController {
  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      return res.json(orders);
    } catch (e) {
      console.log(e);
    }
  }

  async createOrders(req, res, next) {
    try {

      const { fullName, address, allPrice, products } = req.body;

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

      return res.status(201).json({ order, userUpdate });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new orderController();
