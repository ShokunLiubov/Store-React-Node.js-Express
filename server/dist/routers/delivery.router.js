import Router from "express";
import controller from "../controllers/delivery.controller";
const router = Router();
router.get("/", controller.getDeliveryOptions);
router.post("/", controller.updateDeliveryOptions);
export { router as deliveryRouter };
