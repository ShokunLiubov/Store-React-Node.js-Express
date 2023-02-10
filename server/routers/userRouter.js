import Router from "express";
const router = new Router();
import controller from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

// create router
router.post("/info", authMiddleware, controller.postUserInfo);
router.put("/info", authMiddleware, controller.updateUserInfo);

router.get("/info", authMiddleware, controller.getUserInfo);

export { router as userRouter };
