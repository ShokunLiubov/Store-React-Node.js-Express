var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Products from '../models/Products.model';
class madeInController {
    getAllMadeIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const madeIn = yield Products.aggregate([
                    { $group: { _id: '$made_in' } },
                    { $group: { _id: null, made_in: { $push: '$_id' } } },
                    { $project: { _id: 0, uniqueMadeIn: '$made_in' } }
                ]);
                return res.status(200).json(madeIn[0].uniqueMadeIn);
            }
            catch (e) {
                console.error(e.message);
            }
        });
    }
}
export default new madeInController();
