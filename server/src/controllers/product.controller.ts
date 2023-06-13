import { NextFunction, Request, Response } from 'express'
import ProductBasketDto from "../dto/productBasket.dto"
import productFilters from '../filters/product.filters'
import Products from "../models/Products.model"
import productService from "../service/product.service"
import { IReqWithImg } from '../types/product.interface'


class productsController {

  async getProducts(req: Request, res: Response, next: NextFunction) {

    try {
      const { page = 1, limit = 10, sortField, sortOrder } = req.query

      const filters = await productFilters.productFilters(req.query)

      const products = await Products.paginate(filters, {
        page: +page, limit: +limit,
        sort: [[sortField, sortOrder]],
        populate: [
          { path: "category", select: 'name -_id' },
          { path: "classification", select: 'name -_id' },
        ],
      })

      return res.status(200).json(products)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Products error" })
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await Products
        .findById(req.params.id)
        .populate("category", "name -_id")
        .populate("classification", "name -_id")

      if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
      }

      return res.status(200).json(product)

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Product error" })
    }
  }

  async getProductForBasket(req: Request, res: Response, next: NextFunction) {

    try {
      const product = await Products
        .findById(req.params.id)
        .populate("category", "name -_id")
        .populate("classification", "name -_id")
        .select('title count category image price classification')

      if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
      }

      if (product.count === 0) {
        return res.status(200).json({ message: "Count 0" })
      }
      const productBasketDto = new ProductBasketDto(product)

      return res.json({ ...productBasketDto })

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Product error" })
    }
  }


  async getProductForEdit(req: Request, res: Response, next: NextFunction) {

    try {
      const product = await Products.findById(req.params.id)

      if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
      }

      return res.json({ product })

    } catch (e) {

      console.log(e)
      res.status(400).json({ message: "Product error" })
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    
    try {

      const product = await productService.deleteProduct(req.params.id)

      return res.send(product)

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Delete product error" })
    }
  }

  async createProduct(req: IReqWithImg, res: Response, next: NextFunction) {

    try {
      if(!req.file.filename) {
        return res.status(400).json({ message: "Image is not found" })
      }

      const product = await productService.createProduct(req.body, req.file.filename)

      return res.status(201).json(product)

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Create product  error" })
    }
  }

  async updateProductEdit(req: IReqWithImg, res: Response, next: NextFunction) {

    try {
      let filename
      if (req.file) {
        filename = req.file.filename
      }
      const product = await productService.updateProduct(req.body, req.params.id, filename)


      if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
      }

      return res.json({ product })

    } catch (e) {

      console.log(e)
      res.status(400).json({ message: "Product error" })
    }
  }
}

export default new productsController()
