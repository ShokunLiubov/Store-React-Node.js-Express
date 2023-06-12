import Router from "express"
import controller from "../controllers/product.controller"
import upload from "../middleware/multerImageMiddleware"

const router = Router()

router.get("/", controller.getProducts)
router.get("/:id", controller.getProductForBasket)
router.get("/product/:id", controller.getProductById)
router.delete("/:id", controller.deleteProduct)
router.post("/", upload.single("image"), controller.createProduct)
router.get("/edit/:id", controller.getProductForEdit)
router.put("/edit/:id", upload.single("image"), controller.updateProductEdit)


export { router as productsRouter }

