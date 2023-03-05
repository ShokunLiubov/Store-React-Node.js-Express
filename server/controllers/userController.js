import User from "../models/User"
import userService from "../service/userService"

class userController {

  async getUserInfo(req, res, next) {

    try {
      const id = req.id
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
        // select:
      })

      return res.json(user.userInfo)
    } catch (e) {
      console.log(e)
    }
  }

  async getUsers(req, res, next) {

    try {
      const { page, limit, sortField, sortOrder } = req.query

      const users = await User.paginate({ roles: "USER" }, {
        page, limit,
        select: 'username userInfo',
        populate: {
          path: "userInfo",
          model: "UserInfo",
          select: 'email phone address -_id',
        },
        sort: [[sortField, sortOrder]],
      })


      return res.json(users)
    } catch (e) {
      console.log(e)
    }
  }

  async updateUserInfo(req, res, next) {

    try {
      const id = req.id
      const payload = req.body

      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      })

      const updateUserInfo = await userService.updateUserInfo(payload, user)

      return res.json(updateUserInfo)
    } catch (e) {
      console.log(e)
    }
  }

  async postUserInfo(req, res, next) {
    try {
      const payload = req.body
      const id = req.id
      const userInfo = await userService.postUserInfo(
        payload, id
      )

      return res.json(userInfo)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new userController()
