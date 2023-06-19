var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import Products from "../models/Products.model";
class productService {
    createProduct(payload, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, category, classification, price, count, gender, volume, type_of_aroma, country_of_TM, made_in, description } = payload;
            yield Products.createIndexes();
            const product = yield Products.create({
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
            });
            return { product };
        });
    }
    updateProduct(payload, id, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, category, classification, price, count, gender, volume, type_of_aroma, country_of_TM, made_in, description, image } = payload;
            const product = yield Products.findByIdAndUpdate(id, {
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
            });
            return { product };
        });
    }
    deleteProduct(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productImg = yield Products.findById(id);
            const img = productImg === null || productImg === void 0 ? void 0 : productImg.image.slice(7);
            fs.unlink('./public' + img, err => {
                if (err)
                    throw err;
            });
            const product = yield Products.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return { product };
        });
    }
}
export default new productService();
