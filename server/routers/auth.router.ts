import Router from "express"
import { check } from "express-validator"
import controller from "../controllers/auth.controller"

const router = Router() 

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

export { router as authRouter }

