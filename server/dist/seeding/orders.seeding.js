var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faker } from '@faker-js/faker';
import { ORDER_STATUS } from '../enums/orderStatus';
import { EnumRoles } from '../enums/roles.enum';
import Order from '../models/Order.model';
import Products from '../models/Products.model';
import User from '../models/User.model';
class seedingOrders {
    createOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User
                    .find()
                    .select('username')
                    .populate({
                    path: "userInfo",
                    model: "UserInfo",
                })
                    .populate({
                    path: "roles",
                    match: { value: EnumRoles.USER }
                });
                users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const numberOfOrders = faker.datatype.number({ min: 1, max: 10 });
                    for (let i = 0; i < numberOfOrders; i++) {
                        const numberOfProducts = faker.datatype.number({ min: 1, max: 10 });
                        const productsBasket = [];
                        const products = yield Products.find({});
                        for (let j = 0; j < numberOfProducts; j++) {
                            const randomProduct = Math.floor(Math.random() * products.length);
                            const product = products[randomProduct];
                            productsBasket.push({
                                productId: product.id,
                                count: faker.datatype.number({ min: 1, max: 5 }),
                            });
                        }
                        const keysStatus = Object.keys(ORDER_STATUS);
                        const randomStatus = keysStatus[Math.floor(Math.random() * keysStatus.length)];
                        let info = user.userInfo;
                        let allPrice = 0;
                        for (let i = 0; i < productsBasket.length; i++) {
                            const product = productsBasket[i];
                            const productPrice = yield Products.findById({ _id: product.productId });
                            allPrice += productPrice.price * product.count;
                        }
                        // const status: any = ORDER_STATUS[randomStatus]
                        const order = yield Order.create({
                            fullName: info.fullName,
                            address: {
                                city: info.address.city,
                                street: info.address.street,
                                postOffice: info.address.postOffice,
                            },
                            products: productsBasket,
                            allPrice: allPrice,
                            status: 'Availability is check',
                            createdAt: faker.date.between('2022-10-01T00:00:00.000Z', '2023-03-01T00:00:00.000Z')
                        });
                        const userId = { _id: user._id };
                        yield User.findByIdAndUpdate(userId, {
                            $addToSet: { orders: order._id },
                        }, { new: true, useFindAndModify: false });
                    }
                }));
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new seedingOrders();
