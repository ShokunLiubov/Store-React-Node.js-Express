import Router from "express"
import controller from "../controllers/deliveryController"

const router = new Router()

router.get("/", controller.getDeliveryOptions)
router.post("/", controller.updateDeliveryOptions)

export { router as deliveryRouter }
