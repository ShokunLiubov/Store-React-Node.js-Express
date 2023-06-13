import { NextFunction, Response } from 'express'
import jwt from "jsonwebtoken"
import AuthError from "../exception/authError"
import tokenService from "../service/token.service"
import { IReqAuthMiddleware } from '../types/auth.interface'

export default function (roles: any) {

  return function (req: IReqAuthMiddleware, res: Response, next: NextFunction) {

    if (req.method === "OPTIONS") {
      next()
    }

    try {
      // access if user concrete role
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return next(AuthError.UnauthorizedError())
      }

      const userData = tokenService.validateAccessToken(token)

      if (!userData) {
        return next(AuthError.UnauthorizedError())
      }
      req.user = userData

      const { roles: userRoles }: any = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || '',
      )

      let hasRole = false

      userRoles.forEach((role: any) => {
        if (roles.includes(role.value)) {
          hasRole = true

        }
      })

      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access" })
      }

      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: "User not authorized" })
    }
  }
}
