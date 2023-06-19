import Router from "express";
import controller from "../controllers/typeAroma.controller";
const router = Router();
router.get("/", controller.getAllTypeAroma);
export { router as typeAromaRouter };
