import Router from "express"
import controller from "../controllers/countryTMController"

const router = new Router()

router.get("/", controller.getAllCountryTM)

export { router as countryTMRouter }
