import Router from "express"
import controller from "../controllers/classificationController"

const router = new Router()

router.get("/", controller.getAllClassification)

export { router as classificationRouter }

