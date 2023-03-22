import Router from "express"
import controller from "../controllers/typeAromaController"

const router = new Router()

router.get("/", controller.getAllTypeAroma)

export { router as typeAromaRouter }
