import tokenService from "../service/tokenService";
import userService from "../service/userService";
import jwt from "jsonwebtoken";
import User from "../models/User";
import UserInfo from "../models/UserInfo";

class userController {
  async getUserInfo(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      });

      return res.json(user.userInfo);
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserInfo(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      });

      const { fullName, email, phone, address } = req.body;

      const updateUserInfo = await UserInfo.findByIdAndUpdate(
        user.userInfo._id,
        {
          fullName,
          email,
          phone,
          address: {
            city: address.city,
            street: address.street,
            postOffice: address.postOffice,
          },
        },
      );
      console.log(updateUserInfo);

      return res.json(updateUserInfo);
    } catch (e) {
      console.log(e);
    }
  }

  async postUserInfo(req, res, next) {
    try {
      const { fullName, email, phone, address } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const userData = await userService.postUserInfo(
        fullName,
        email,
        phone,
        address,
        token,
      );
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new userController();
