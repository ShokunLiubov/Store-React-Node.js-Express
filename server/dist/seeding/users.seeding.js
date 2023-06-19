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
import bcrypt from "bcryptjs";
import { EnumRoles } from '../enums/roles.enum';
import Role from '../models/Role.model';
import User from '../models/User.model';
import UserInfo from '../models/UserInfo.model';
class seedingUsers {
    createUserWithUserInfo(countUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = bcrypt.hashSync(faker.internet.password(20), 7);
                const userRole = yield Role.findOne({ value: EnumRoles.USER });
                for (let i = 1; i <= countUsers; i++) {
                    const user = yield User.create({
                        username: faker.internet.userName(),
                        password: hashPassword,
                        roles: [userRole === null || userRole === void 0 ? void 0 : userRole._id],
                    });
                    const userInfo = yield UserInfo.create({
                        fullName: faker.name.fullName(),
                        email: faker.internet.email(),
                        phone: faker.phone.number('+380#########'),
                        address: {
                            city: faker.address.cityName(),
                            street: faker.address.street(),
                            postOffice: faker.address.zipCode('###'),
                        },
                    });
                    const userId = { _id: user._id };
                    const userInfoId = { $set: { userInfo: userInfo._id } };
                    yield User.updateOne(userId, userInfoId);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new seedingUsers();
