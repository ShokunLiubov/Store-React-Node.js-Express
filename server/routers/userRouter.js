import Router from "express";
import controller from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = new Router();
router.post("/info", authMiddleware, controller.postUserInfo);
router.put("/info", authMiddleware, controller.updateUserInfo);
router.get("/info", authMiddleware, controller.getUserInfo);
router.get("/", roleMiddleware(["ADMIN"]), controller.getUsers);

export { router as userRouter };
