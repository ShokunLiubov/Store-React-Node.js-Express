import Router from "express"
import controller from "../controllers/productController"
import upload from "../middleware/multerImageMiddleware"

const router = new Router()
router.get("/", controller.getProducts)
router.get("/:id", controller.getProductForBasket)
router.get("/product/:id", controller.getProductForPage)
router.delete("/:id", controller.deleteProduct)
router.post("/", upload.single("image"), controller.postProduct)
router.get("/edit/:id", controller.getProductForEdit)
router.put("/edit/:id", upload.single("image"), controller.updateProductEdit)


export { router as productsRouter }

