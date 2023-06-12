import bcrypt from "bcryptjs"
import UserDto from "../dto/user.dto"
import AuthError from "../exception/authError"
import Role from "../models/Role.model"
import User from "../models/User.model"
import UserInfo from "../models/UserInfo.model"
import tokenService from "./tokenService"

class UserService {

  async registration(username, password) {

    const candidate = await User.findOne({ username })

    if (candidate) {
      throw AuthError.BadRequest("User with the same name already exists")
    }

    // Create user and tokens
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({ value: "USER" })
    const user = await User.create({
      username,
      password: hashPassword,
      roles: [userRole._id],
    })

    const userDto = new UserDto(user) // id, username
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    // Create user and tokens

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(username, password) {

    const user = await User
      .findOne({ username })
      .populate({
        path: "roles",
      })

    // Check User presence
    if (!user) {
      throw AuthError.BadRequest("User not registration")
    }
    // Check User presence

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw AuthError.BadRequest("Wrong password entered")
    }

    const userDto = new UserDto(user) // id, username
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {

    const token = await tokenService.removeToken(refreshToken)

    return token
  }

  async refresh(refreshToken) {

    if (!refreshToken) {
      throw AuthError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw AuthError.UnauthorizedError()
    }

    const user = await User.findById(userData.id).populate('roles')
    const userDto = new UserDto(user) // id, username
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async postUserInfo(payload, id) {

    const { fullName, email, phone, address } = payload

    const userInfo = await UserInfo.create({
      fullName,
      email,
      phone,
      address: {
        city: address.city,
        street: address.street,
        postOffice: address.postOffice,
      },
    })

    const userId = { _id: id }
    const userInfoId = { $set: { userInfo: userInfo._id } }
    const userUpdate = await User.updateOne(userId, userInfoId)

    return { userInfo, userUpdate }
  }

  async updateUserInfo(payload, user) {

    const { fullName, email, phone, address } = payload

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
    )

    return updateUserInfo
  }
}

export default new UserService()
