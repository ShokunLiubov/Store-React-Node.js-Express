import Router from "express"
import controller from "../controllers/categoryController"

const router = new Router()

router.get("/", controller.getAllCategory)

export { router as categoryRouter }

