import Router from "express"
import controller from "../controllers/store.controller"

const router = Router()

router.get("/home-products", controller.getProducts)


export { router as storeRouter }
