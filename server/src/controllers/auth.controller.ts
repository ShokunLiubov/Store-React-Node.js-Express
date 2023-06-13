import { NextFunction, Request, Response } from 'express'
import { validationResult } from "express-validator"
import { EnumTokens } from '../enums/tokens.enum'
import AuthError from "../exception/authError"
import userService from "../service/user.service"
import { IAuth } from '../types/product.interface'

class authController {

  async registration(req: Request, res: Response, next: NextFunction) {

    try {
      // Validation
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(AuthError.BadRequest("Validation error", errors.array()))
      }

      const { username, password }: IAuth = req.body
      
      const userData = await userService.registration(username, password)
      res.cookie(EnumTokens.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)

    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {

    try {
      const { username, password }: IAuth = req.body
      
      const userData = await userService.login(username, password)
      res.cookie(EnumTokens.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {

    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie(EnumTokens.REFRESH_TOKEN)

      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {

    try {
      const { refreshToken } = req.cookies
      
      const userData = await userService.refresh(refreshToken)
      res.cookie(EnumTokens.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

}

export default new authController()
