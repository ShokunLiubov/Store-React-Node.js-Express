import Router from "express"
import controller from "../controllers/user.controller"
import authMiddleware from "../middleware/authMiddleware"
import roleMiddleware from "../middleware/roleMiddleware"

const router = Router()

router.post("/info", authMiddleware, controller.postUserInfo)
router.put("/info", authMiddleware, controller.updateUserInfo)
router.get("/info", authMiddleware, controller.getUserInfo)
router.get("/", roleMiddleware(["ADMIN"]), controller.getUsers)
router.get("/city", roleMiddleware(["ADMIN"]), controller.getCity)

export { router as userRouter }

