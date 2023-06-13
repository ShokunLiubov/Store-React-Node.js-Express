import Router from "express"
import controller from "../controllers/classification.controller"

const router = Router()

router.get("/", controller.getAllClassification)

export { router as classificationRouter }

