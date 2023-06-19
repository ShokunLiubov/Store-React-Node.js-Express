var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Delivery from '../models/Delivery.model';
class deliveryController {
    getDeliveryOptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryOptions = yield Delivery.find({}).select('deliveryType price name');
                return res.status(200).json(deliveryOptions);
            }
            catch (error) {
                console.error('Error getting delivery options:', error);
                return null;
            }
        });
    }
    updateDeliveryOptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, price } = req.body;
                const updateDeliveryOption = yield Delivery.findByIdAndUpdate(id, { price });
                return res.status(201).json(updateDeliveryOption);
            }
            catch (error) {
                console.error('Error getting delivery options:', error);
                return null;
            }
        });
    }
}
export default new deliveryController();
