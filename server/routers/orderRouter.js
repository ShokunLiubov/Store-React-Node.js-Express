import Router from "express";
import controller from "../controllers/orderController";
import roleMiddleware from "../middleware/roleMiddleware";

const router = new Router();

router.get("/order", roleMiddleware(["ADMIN"]), controller.getOrders);

router.post("/order", controller.postOrders);

export default router;
