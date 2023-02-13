import Products from "../models/Products";

class productService {

    async createProduct(payload) {

        const { title, category, classification, price, count, gender, volume, type_of_aroma, country_of_TM, made_in, description } = payload
        const product = await Products.create({
            image: "./../../image_product/" + req.file.filename,
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
        });

        return { product };
    }

    async deleteProduct(id) {

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = await Products.findByIdAndDelete(id);

        return { product };
    }
}

export default new productService();
