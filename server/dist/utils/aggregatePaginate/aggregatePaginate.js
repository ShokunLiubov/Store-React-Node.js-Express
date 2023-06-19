var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class aggregatePaginate {
    aggregatePaginate({ page, limit, Collection, aggregateBody, sortField, sortOrder }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                page = +page;
                limit = +limit;
                sortOrder = +sortOrder;
                const count = yield Collection.aggregate([
                    ...aggregateBody,
                    { $count: "count" }
                ]);
                const docs = yield Collection.aggregate([
                    ...aggregateBody,
                    {
                        $sort: { [sortField]: sortOrder }
                    },
                    {
                        $skip: (page - 1) * limit
                    },
                    {
                        $limit: limit
                    }
                ]);
                const totalDocs = (_b = (_a = count[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0;
                const totalPages = Math.ceil(totalDocs / limit);
                return {
                    docs: docs || [],
                    currentPage: page, totalPages
                };
            }
            catch (e) {
                console.log(e);
                return {
                    docs: [],
                    page: 0,
                    totalPages: 0,
                };
            }
        });
    }
}
export default new aggregatePaginate();
