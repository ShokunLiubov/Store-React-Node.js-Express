var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../models/Order.model";
import Products from "../models/Products.model";
import User from "../models/User.model";
class orderService {
    createOrder(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, address, allPrice, products } = payload;
            const order = yield Order.create({
                fullName,
                address: {
                    city: address === null || address === void 0 ? void 0 : address.city,
                    street: address === null || address === void 0 ? void 0 : address.street,
                    postOffice: address === null || address === void 0 ? void 0 : address.postOffice,
                },
                allPrice,
                products,
            });
            products.map((product) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const count = (_a = product.count) !== null && _a !== void 0 ? _a : 1;
                return yield Products.findByIdAndUpdate({ _id: product.productId }, {
                    $inc: {
                        count: -count
                    }
                });
            }));
            const userUpdate = yield User.findByIdAndUpdate({ id: userId }, {
                $addToSet: { orders: order._id },
            }, { new: true, useFindAndModify: false });
            return { order, userUpdate };
        });
    }
}
export default new orderService();
