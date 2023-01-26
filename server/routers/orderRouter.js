import Router from "express";
import controller from "../controllers/orderController";
import roleMiddleware from "../middleware/roleMiddleware";

const router = new Router();

router.get("/", roleMiddleware(["ADMIN"]), controller.getOrders);

router.post("/", controller.postOrders);

export { router as orderRouter };
