var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.model";
import UserInfo from '../models/UserInfo.model';
import userService from "../service/user.service";
import aggregatePaginate from '../utils/aggregatePaginate/aggregatePaginate';
class userController {
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.id;
                const user = yield User.findById({ _id: id }).populate({
                    path: "userInfo",
                    model: "UserInfo",
                });
                return res.json(user === null || user === void 0 ? void 0 : user.userInfo);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page = 1, limit = 10, sortField, sortOrder, search, city } = req.query;
                page = +page;
                limit = +limit;
                const filters = {};
                let or = {};
                if (search) {
                    let regex = new RegExp(search, 'i');
                    or = {
                        $or: [
                            { "userInfo.email": regex },
                            { "userInfo.phone": regex },
                            { "username": regex }
                        ]
                    };
                }
                if (city && city.trim()) {
                    const citySelect = city.split(',');
                    filters["userInfo.address.city"] = { $in: citySelect };
                }
                const aggregateBody = [{
                        $lookup: {
                            from: "userinfos",
                            localField: "userInfo",
                            foreignField: "_id",
                            as: "userInfo"
                        }
                    },
                    {
                        $unwind: "$userInfo"
                    },
                    {
                        $match: {
                            $and: [
                                Object.assign({}, or),
                                Object.assign({}, filters)
                            ]
                        }
                    }
                ];
                let sort = {};
                if (sortField && sortOrder) {
                    sort = { [sortField]: +sortOrder };
                }
                const { docs, totalPages } = yield aggregatePaginate.aggregatePaginate({ page, limit, Collection: User, aggregateBody, sort });
                return res.json({
                    docs,
                    totalPages, page
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    updateUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.id;
                const payload = req.body;
                const user = yield User.findById({ _id: id }).populate({
                    path: "userInfo",
                    model: "UserInfo",
                });
                const updateUserInfo = yield userService.updateUserInfo(payload, user);
                return res.json(updateUserInfo);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    postUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const id = req.id;
                const userInfo = yield userService.postUserInfo(payload, id);
                return res.json(userInfo);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = yield UserInfo.aggregate([
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
export default new userController();
