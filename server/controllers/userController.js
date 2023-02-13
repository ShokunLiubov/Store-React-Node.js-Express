import userService from "../service/userService";
import User from "../models/User";

class userController {

  async getUserInfo(req, res, next) {

    try {
      const id = req.id
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      });

      return res.json(user.userInfo);
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res, next) {

    try {
      const users = await User.find({ roles: "USERS" }).populate({
        path: "userInfo",
        model: "UserInfo",
      });

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserInfo(req, res, next) {

    try {
      const id = req.id
      const payload = req.body;

      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      });

      const updateUserInfo = await userService.updateUserInfo(payload, user)

      return res.json(updateUserInfo);
    } catch (e) {
      console.log(e);
    }
  }

  async postUserInfo(req, res, next) {
    try {
      const payload = req.body;
      const id = req.id
      const userInfo = await userService.postUserInfo(
        payload, id
      );

      return res.json(userInfo);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new userController();
