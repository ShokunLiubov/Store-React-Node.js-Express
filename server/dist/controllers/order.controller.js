var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import orderFilters from '../filters/order.filters';
import Order from '../models/Order.model';
import orderService from "../service/order.service";
class orderController {
    getOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 20, sortField, sortOrder } = req.query;
                const filters = yield orderFilters.orderFilters(req.query);
                const orders = yield Order.paginate(filters, { page: +page, limit: +limit, sort: [[sortField, sortOrder]] });
                return res.status(200).json(orders);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    createOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderService.createOrder(req.body, req.id);
                return res.status(201).json(order);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield Order.aggregate([
                    { $group: { _id: '$address.city' } },
                    { $group: { _id: null, uniqueCity: { $push: '$_id' } } },
                    { $project: { _id: 0, uniqueCity: 1 } }
                ]);
                return res.status(200).json(city[0].uniqueCity);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new orderController();
