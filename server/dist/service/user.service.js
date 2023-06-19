var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import UserDto from "../dto/user.dto";
import AuthError from "../exception/authError";
import Role from "../models/Role.model";
import User from "../models/User.model";
import UserInfo from "../models/UserInfo.model";
import tokenService from "./token.service";
class UserService {
    registration(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User.findOne({ username });
            if (candidate) {
                throw AuthError.BadRequest("User with the same name already exists");
            }
            // Create user and tokens
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = yield Role.findOne({ value: "USER" });
            const user = yield User.create({
                username,
                password: hashPassword,
                roles: [userRole === null || userRole === void 0 ? void 0 : userRole.id],
            });
            const userDto = new UserDto(user); // id, username
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            // Create user and tokens
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User
                .findOne({ username })
                .populate({
                path: "roles",
            });
            // Check User presence
            if (!user) {
                throw AuthError.BadRequest("User not registration");
            }
            // Check User presence
            // Check password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw AuthError.BadRequest("Wrong password entered");
            }
            const userDto = new UserDto(user); // id, username
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield tokenService.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw AuthError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw AuthError.UnauthorizedError();
            }
            const user = yield User.findById(userData.id).populate('roles');
            const userDto = new UserDto(user); // id, username
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    postUserInfo(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, email, phone, address } = payload;
            const userInfo = yield UserInfo.create({
                fullName,
                email,
                phone,
                address: {
                    city: address.city,
                    street: address.street,
                    postOffice: address.postOffice,
                },
            });
            const userId = { _id: id };
            const userInfoId = { $set: { userInfo: userInfo._id } };
            const userUpdate = yield User.updateOne(userId, userInfoId);
            return { userInfo, userUpdate };
        });
    }
    updateUserInfo(payload, user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, email, phone, address } = payload;
            const updateUserInfo = yield UserInfo.findByIdAndUpdate((_a = user.userInfo) === null || _a === void 0 ? void 0 : _a.id, {
                fullName,
                email,
                phone,
                address: {
                    city: address.city,
                    street: address.street,
                    postOffice: address.postOffice,
                },
            });
            return updateUserInfo;
        });
    }
}
export default new UserService();
