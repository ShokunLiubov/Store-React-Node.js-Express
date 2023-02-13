import Router from "express";
import controller from "../controllers/authController";
import { check } from "express-validator";

const router = new Router();
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
router.get("/refresh", controller.refresh);

export { router as authRouter };
