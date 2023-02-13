import Products from "../models/Products";
import ProductBasketDto from "../dto/productBasketDto";
import productService from "../service/productService";

class productsController {

  async getProducts(req, res, next) {

    try {
      const products = await Products.find();
      return res.json(products);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Products error" });
    }
  }

  async getProduct(req, res, next) {

    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      if (product.count === 0) {
        return res.status(200).json({ message: "Count 0" });
      }
      const productBasketDto = new ProductBasketDto(product);

      return res.json({ ...productBasketDto });

    } catch (e) {

      console.log(e);
      res.status(400).json({ message: "Product error" });
    }
  }

  async deleteProduct(req, res, next) {

    try {

      const product = await productService.deleteProduct(req.params.id);

      return res.send(product);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Delete product error" });
    }
  }

  async postProduct(req, res, next) {

    try {
      const product = await productService.createProduct(req.body);

      return res.status(201).json(product);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create product  error" });
    }
  }
}

export default new productsController();
