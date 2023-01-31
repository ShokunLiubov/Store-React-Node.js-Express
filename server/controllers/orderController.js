import orderService from "../service/orderService";
import AuthError from "../exception/authError";

class orderController {
  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      return res.json(orders);
    } catch (e) {
      console.log(e);
    }
  }

  async postOrders(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw AuthError.UnauthorizedError();
      }
      const { fullName, address, allPrice, products } = req.body;

      const orderData = await orderService.createOrder(
        token,
        fullName,
        address,
        allPrice,
        products,
      );
      return res.status(201).json(orderData);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new orderController();
