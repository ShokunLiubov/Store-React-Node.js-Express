import Router from "express"
import controller from "../controllers/storeController"

const router = new Router()
router.get("/home-products", controller.getProducts)


export { router as storeRouter }
