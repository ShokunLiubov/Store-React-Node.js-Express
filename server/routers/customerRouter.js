import Router from "express";
const router = new Router();
import controller from "../controllers/customerController";
import roleMiddleware from "../middleware/roleMiddleware";

// create router
router.post("/info", controller.postCustomerInfo);
router.get("/info", controller.getCustomerInfo);

export default router;
