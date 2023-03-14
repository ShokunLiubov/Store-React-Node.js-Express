import User from "../models/User"
import userService from "../service/userService"
import aggregatePaginate from '../utils/aggregatePaginate/aggregatePaginate'

class userController {

  async getUserInfo(req, res, next) {

    try {
      const id = req.id
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      })

      return res.json(user.userInfo)
    } catch (e) {
      console.log(e)
    }
  }

  async getUsers(req, res, next) {

    try {
      let { page, limit, sortField, sortOrder, search } = req.query
      page = Number(page)
      const regex = new RegExp(search, 'i')

      const aggregateBody = [{
        $lookup: {
          from: "userinfos",
          localField: "userInfo",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $match: {
          $or: [
            { "userInfo.email": regex },
            { "userInfo.phone": regex },
            { "username": regex }
          ]
        }
      }]

      const sort = { [sortField]: sortOrder }

      const { docs, totalPages } = await aggregatePaginate.aggregatePaginate(page, limit, User, aggregateBody, sort)

      return res.json({
        docs,
        totalPages, page
      })


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
