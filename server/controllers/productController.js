import Products from "../models/Products";
import { MongoClient, ObjectId } from "mongodb";
import ProductBasketDto from "../dto/productBasketDto";

class productsController {
  async getProducts(req, res, next) {
    try {
      const products = await Products.find();
      res.json(products);
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
      res.json({ ...productBasketDto });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Product error" });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.send(product);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Delete product error" });
    }
  }

  async postProduct(req, res, next) {
    try {
      const body = req.body;
      const product = await Products.create({
        image: "./../../image_product/" + req.file.filename,
        title: body.title,
        category: body.category,
        classification: body.classification,
        price: body.price,
        count: body.count,
        gender: body.gender,
        volume: body.volume,
        type_of_aroma: body.type_of_aroma,
        country_of_TM: body.country_of_TM,
        made_in: body.made_in,
        description: body.description,
      });

      return res.status(201).json(product);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create product  error" });
    }
  }
}

export default new productsController();
