import { Response } from 'express'
import fs from 'fs'
import Products from "../models/Products.model"
import { IProductsDocument } from '../types/product.interface'

class productService {

    async createProduct(payload: IProductsDocument, filename: string) {

        const { title, category, classification, price, count, gender, volume, type_of_aroma, country_of_TM, made_in, description } = payload
        await Products.createIndexes()
        const product = await Products.create({
            image: "./../../image_product/" + filename,
            title,
            category,
            classification,
            price,
            count,
            gender,
            volume,
            type_of_aroma,
            country_of_TM,
            made_in,
            description,
        })

        return { product }
    }

    async updateProduct(payload: IProductsDocument, id: string, filename: string) {

        const { title, category, classification, price, count, gender, volume, type_of_aroma, country_of_TM, made_in, description, image } = payload

        const product = await Products.findByIdAndUpdate(id, {
            image: filename ? "./../../image_product/" + filename : image,
            title,
            category,
            classification,
            price,
            count,
            gender,
            volume,
            type_of_aroma,
            country_of_TM,
            made_in,
            description,
        })


        return { product }
    }

    async deleteProduct(id: string, res: Response) {
        const productImg = await Products.findById(id)
        const img = productImg?.image.slice(7)

        fs.unlink('./public' + img, err => {
            if (err) throw err
        })

        const product = await Products.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        return { product }
    }
}

export default new productService()
