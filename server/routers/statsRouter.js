import Router from "express"
import controller from "../controllers/statsController"

const router = new Router()
router.get("/orders/month", controller.getOrdersByMonth)
router.get("/orders/city", controller.getOrdersByCity)
router.get("/years", controller.getYearsForStats)
router.get("/profit", controller.getProfitOverTime)


export { router as statsRouter }
