const Router = require("express");
const router = new Router();
const controller = require("../controllers/customerController");
const roleMiddleware = require("../middleware/roleMiddleware");

// create router
router.post("/info", controller.postCustomerInfo);
router.get("/info", controller.getCustomerInfo);

module.exports = router;
