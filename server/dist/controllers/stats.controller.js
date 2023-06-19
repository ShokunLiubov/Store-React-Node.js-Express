var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dateRange from '../filters/dateRange';
import Order from '../models/Order.model';
class statsController {
    getOrdersByMonth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { year } = req.query;
                const ordersByMonth = yield Order.aggregate([
                    { $match: { createdAt: { $gte: new Date(Number(year), 0, 1), $lte: new Date(Number(year), 11, 31, 23, 59, 59, 999) } } },
                    {
                        $facet: {
                            // We group orders by months and summarize the number and total cost of orders
                            byMonth: [
                                {
                                    $group: {
                                        _id: { $month: "$createdAt" },
                                        count: { $sum: 1 },
                                        total: { $sum: "$allPrice" },
                                    },
                                },
                                { $sort: { _id: 1 } },
                            ],
                            // We create separate documents for each month with zero orders and a total cost of 0
                            allMonths: [
                                {
                                    $project: {
                                        month: { $range: [1, 13] },
                                    },
                                },
                                { $unwind: "$month" },
                                {
                                    $group: {
                                        _id: "$month",
                                        count: { $sum: 0 },
                                        total: { $sum: 0 },
                                    },
                                },
                                { $sort: { _id: 1 } },
                            ],
                        },
                    },
                    // Combine results of two streams and sort months from 1 to 12
                    {
                        $project: {
                            months: {
                                $concatArrays: ["$allMonths", "$byMonth"],
                            },
                        },
                    },
                    { $unwind: "$months" },
                    {
                        $group: {
                            _id: "$months._id",
                            count: { $sum: "$months.count" },
                            total: { $sum: "$months.total" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            month: "$_id",
                            count: 1,
                            total: 1
                        }
                    },
                    { $sort: { month: 1 } },
                ]);
                return res.status(200).json(ordersByMonth);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getOrdersByCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { year } = req.query;
                const ordersByCity = yield Order.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(Number(year), 0, 1),
                                $lte: new Date(Number(year), 11, 31, 23, 59, 59, 999),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$address.city",
                            total: { $sum: "$allPrice" },
                        },
                    },
                    { $sort: { total: -1 } },
                    { $limit: 5 },
                ]);
                return res.status(200).json(ordersByCity);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getYearsForStats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const years = yield Order.aggregate([
                    { $project: { year: { $year: '$createdAt' } } },
                    { $group: { _id: null, years: { $push: '$year' } } },
                    { $unwind: '$years' },
                    { $group: { _id: null, years: { $addToSet: '$years' } } },
                    { $project: { _id: 0, years: -1 } },
                    { $unwind: '$years' },
                    { $sort: { years: 1 } },
                    { $group: { _id: null, years: { $push: '$years' } } },
                    { $project: { _id: 0, years: -1 } },
                ]).exec();
                return res.status(200).json(years[0].years);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getProfitOverTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { dataRange, year } = req.query;
                let date = {};
                let createdAt = {};
                if (dataRange) {
                    const { from, to } = dataRange;
                    createdAt = yield dateRange.dataRangePicker(from, to);
                    date = {
                        from: new Date(from).toISOString(),
                        to: new Date(to).toISOString()
                    };
                }
                else {
                    createdAt = {
                        $gte: new Date(Number(year), 0, 1),
                        $lte: new Date(Number(year), 11, 31, 23, 59, 59, 999),
                    };
                    date = { from: new Date(Number(year), 1, -29), to: new Date(Number(year), 11, 31, 23, 59, 59, 999) };
                }
                let profitOverTime = yield Order.aggregate([
                    {
                        $match: { createdAt }
                    },
                    {
                        $group: {
                            _id: null,
                            totalProfit: { $sum: "$allPrice" }
                        }
                    },
                ]);
                if (!profitOverTime.length) {
                    profitOverTime = [{ totalProfit: 0 }];
                }
                return res.status(200).json({ profit: profitOverTime[0], date });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
export default new statsController();
