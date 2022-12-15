const Router = require("express");
const router = new Router();
const controller = require("../controllers/productsController");
const multer = require("multer");
const Products = require("../models/Products");
const path = require("path");

const dirPath = path.join(__dirname, "../../public/image_product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
    );
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, filefilter: filefilter });

router.get("/products", controller.getProducts);

router.delete("/products/:id", controller.deleteProduct);

router.post("/products", upload.single("image"), controller.postProduct);

module.exports = router;
