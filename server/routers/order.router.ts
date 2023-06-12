import Router from "express"
import controller from "../controllers/order.controller"
import authMiddleware from "../middleware/authMiddleware"
import roleMiddleware from "../middleware/roleMiddleware"

const router = Router()

router.get("/", roleMiddleware(["ADMIN"]), controller.getOrders)
router.get("/city", roleMiddleware(["ADMIN"]), controller.getCity)
router.post("/", authMiddleware, controller.createOrders)

export { router as orderRouter }

