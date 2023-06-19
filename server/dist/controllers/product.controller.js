var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProductBasketDto from "../dto/productBasket.dto";
import productFilters from '../filters/product.filters';
import Products from "../models/Products.model";
import productService from "../service/product.service";
class productsController {
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10, sortField, sortOrder } = req.query;
                const filters = yield productFilters.productFilters(req.query);
                const products = yield Products.paginate(filters, {
                    page: +page, limit: +limit,
                    sort: [[sortField, sortOrder]],
                    populate: [
                        { path: "category", select: 'name -_id' },
                        { path: "classification", select: 'name -_id' },
                    ],
                });
                return res.status(200).json(products);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Products error" });
            }
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Products
                    .findById(req.params.id)
                    .populate("category", "name -_id")
                    .populate("classification", "name -_id");
                if (!product) {
                    return res.status(404).json({ message: "Product Not Found" });
                }
                return res.status(200).json(product);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Product error" });
            }
        });
    }
    getProductForBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Products
                    .findById(req.params.id)
                    .populate("category", "name -_id")
                    .populate("classification", "name -_id")
                    .select('title count category image price classification');
                if (!product) {
                    return res.status(404).json({ message: "Product Not Found" });
                }
                if (product.count === 0) {
                    return res.status(200).json({ message: "Count 0" });
                }
                const productBasketDto = new ProductBasketDto(product);
                return res.json(Object.assign({}, productBasketDto));
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Product error" });
            }
        });
    }
    getProductForEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Products.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: "Product Not Found" });
                }
                return res.json({ product });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Product error" });
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productService.deleteProduct(req.params.id, res);
                return res.send(product);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Delete product error" });
            }
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file.filename) {
                    return res.status(400).json({ message: "Image is not found" });
                }
                const product = yield productService.createProduct(req.body, req.file.filename);
                return res.status(201).json(product);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Create product  error" });
            }
        });
    }
    updateProductEdit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filename;
                if (req.file) {
                    filename = req.file.filename;
                }
                const product = yield productService.updateProduct(req.body, req.params.id, filename);
                if (!product) {
                    return res.status(404).json({ message: "Product Not Found" });
                }
                return res.json({ product });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Product error" });
            }
        });
    }
}
export default new productsController();
