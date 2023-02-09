import Router from "express";
const router = new Router();
import controller from "../controllers/userController";
import roleMiddleware from "../middleware/roleMiddleware";

// create router
router.post("/info", controller.postUserInfo);
router.put("/info", controller.updateUserInfo);

router.get("/info", controller.getUserInfo);

export { router as userRouter };
