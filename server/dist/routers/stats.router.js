import Router from "express";
import controller from "../controllers/stats.controller";
const router = Router();
router.get("/orders/month", controller.getOrdersByMonth);
router.get("/orders/city", controller.getOrdersByCity);
router.get("/years", controller.getYearsForStats);
router.get("/profit", controller.getProfitOverTime);
export { router as statsRouter };
