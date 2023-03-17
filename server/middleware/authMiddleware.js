import jwt from "jsonwebtoken"
import AuthError from "../exception/authError"

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    // access if user login
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return AuthError.UnauthorizedError()
    }
    const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    req.user = decodedData
    req.id = id

    next()
  } catch (e) {
    console.log(e)
    return AuthError.UnauthorizedError()
  }
}
