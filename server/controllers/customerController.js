const tokenService = require("../service/tokenService");
const userService = require("../service/userService");
const jwt = require("jsonwebtoken");

class customerController {
  async getCustomerInfo(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  async postCustomerInfo(req, res, next) {
    try {
      console.log(req);
      const { email, phone, city } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const userData = await userService.postCustomerInfo(
        email,
        phone,
        city,
        token,
      );
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new customerController();
