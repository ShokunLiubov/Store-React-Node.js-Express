import { NextFunction, Request, Response } from 'express'
import User from "../models/User.model"
import UserInfo from '../models/UserInfo.model'
import userService from "../service/user.service"
import { IUserQueryFilters } from '../types/user.interface'
import aggregatePaginate from '../utils/aggregatePaginate/aggregatePaginate'

class userController {

  async getUserInfo(req: any, res: Response, next: NextFunction)  {

    try {
      const id = req.id
      const user = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      })

      return res.json(user?.userInfo)
    } catch (e) {
      console.log(e)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction)  {

    try {
      let { page = 1, limit = 10, sortField, sortOrder, search, city }: IUserQueryFilters = req.query
      
      page = +page
      limit= +limit
      const filters: any = {};

      let or = {}

      if (search) {
          let regex = new RegExp(search, 'i');
          or =  {
            $or: [
            { "userInfo.email": regex },
            { "userInfo.phone": regex },
            { "username": regex }
          ]
        }
      }
      
      if (city && city.trim()) {
        const citySelect = city.split(',')
        filters["userInfo.address.city"] = { $in: citySelect }
      }

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
          $and: [
            {...or},
            {...filters}
          ]
        }
      }
    ]

      let sort = {};

      if (sortField && sortOrder) {
        sort = { [sortField]: +sortOrder };
      }

      const { docs, totalPages }: any = await aggregatePaginate.aggregatePaginate({ page, limit, Collection:User, aggregateBody, sort })

      return res.json({
        docs,
        totalPages, page
      })

    } catch (e) {
      console.log(e)
    }
  }

  async updateUserInfo(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.id
      const payload = req.body

      const user: any = await User.findById({ _id: id }).populate({
        path: "userInfo",
        model: "UserInfo",
      })

      const updateUserInfo = await userService.updateUserInfo(payload, user)

      return res.json(updateUserInfo)
    } catch (e) {
      console.log(e)
    }
  }

  async postUserInfo(req: any, res: Response, next: NextFunction)  {
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

  async getCity(req: Request, res: Response, next: NextFunction)  {
    try {
      const city = await UserInfo.aggregate([
        { $group: { _id: '$address.city' } },
        { $group: { _id: null, uniqueCity: { $push: '$_id' } } },
        { $project: { _id: 0, uniqueCity: 1 } }
      ])

      return res.status(200).json(city[0].uniqueCity)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new userController()
