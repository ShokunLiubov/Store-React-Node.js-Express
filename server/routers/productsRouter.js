import Router from "express";
import controller from "../controllers/productController";
import upload from "../middleware/multerImageMiddleware";

const router = new Router();
router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.delete("/:id", controller.deleteProduct);
router.post("/", upload.single("image"), controller.postProduct);

export { router as productsRouter };
