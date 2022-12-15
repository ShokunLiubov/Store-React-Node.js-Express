const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

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

module.exports = router;
