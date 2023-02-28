import ProductBasketDto from "../dto/productBasketDto"
import Products from "../models/Products"
import productService from "../service/productService"


class productsController {

  async getProducts(req, res, next) {

    try {
      const { page, limit, sortField, sortOrder, search, category, count, price } = req.query
      const filters = {}

      if (search) {
        filters.title = new RegExp(`${search}`, "i")
      }
      if (category) {
        filters.category = { $in: category.split(',') }
      }
      if (count) {
        const { $gte, $lte } = count

        filters.count = { $gte, $lte }
      }
      if (price) {
        const { $gte, $lte } = price
        filters.price = { $gte, $lte }
      }

      const products = await Products.paginate(filters, { page, limit, sort: [[sortField, sortOrder]] })

      return res.json(products)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Products error" })
    }
  }

  async getProduct(req, res, next) {

    try {
      const product = await Products.findById(req.params.id)

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


  async getProductForEdit(req, res, next) {

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

  async deleteProduct(req, res, next) {

    try {

      const product = await productService.deleteProduct(req.params.id)


      return res.send(product)

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Delete product error" })
    }
  }

  async postProduct(req, res, next) {

    try {

      const product = await productService.createProduct(req.body, req.file.filename)

      return res.status(201).json(product)

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Create product  error" })
    }
  }

  async updateProductEdit(req, res, next) {

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
