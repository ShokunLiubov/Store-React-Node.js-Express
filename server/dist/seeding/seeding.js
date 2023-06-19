var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from '../models/Category.model';
import Classification from '../models/Classification.model';
import Order from '../models/Order.model';
import Products from '../models/Products.model';
import Token from '../models/Token.model';
import User from '../models/User.model';
import UserInfo from '../models/UserInfo.model';
import seedingCategory from './category.seeding';
import seedingClassification from './classification.seeding';
import seedingOrders from './orders.seeding';
import seedingProducts from './products.seeding';
import seedingUsers from './users.seeding';
class seeding {
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserInfo.deleteMany({});
                yield User.deleteMany({});
                yield Order.deleteMany({});
                yield Products.deleteMany({});
                yield Token.deleteMany({});
                yield Category.deleteMany({});
                yield Classification.deleteMany({});
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    sendingData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield seedingUsers.createUserWithUserInfo(20);
                yield seedingCategory.createCategory();
                yield seedingClassification.createClassification();
                yield seedingProducts.createProducts(40);
                yield seedingOrders.createOrders();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new seeding();
