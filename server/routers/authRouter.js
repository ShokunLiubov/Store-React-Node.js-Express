import Router from "express";
const router = new Router();
import controller from "../controllers/authController";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

// create router
router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check(
      "password",
      "Password must be at least 4 and no more than 10 characters",
    ).isLength({ min: 4, max: 25 }),
  ],
  controller.registration,
);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

// router.get("/login", controller.setLogin);

router.get("/refresh", controller.refresh);

router.get(
  "/users",
  // Middleware gives access only "ADMIN"
  roleMiddleware(["ADMIN"]),
  controller.getUsers,
);

export { router as authRouter };
