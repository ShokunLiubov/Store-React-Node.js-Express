import Router from "express"
import controller from "../controllers/madeInController"

const router = new Router()

router.get("/", controller.getAllMadeIn)

export { router as madeInRouter }
