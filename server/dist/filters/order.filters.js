var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dateRange from './dateRange';
class orderFilters {
    orderFilters(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search, dataRange, status, price, city } = query;
                const filters = {};
                if (search) {
                    filters.fullName = new RegExp(`${search}`, "i");
                }
                if (status) {
                    const statusSelect = status.split(',');
                    filters.status = { $in: statusSelect };
                }
                // if (city) {
                //     const citySelect = city.split(',')
                //     filters["address.city"] = { $in: citySelect }
                // }
                if (city) {
                    const citySelect = city.split(',');
                    if (!filters.address) {
                        filters.address = { city: { $in: citySelect } };
                    }
                    else {
                        filters.address.city = { $in: citySelect };
                    }
                }
                if (dataRange && dataRange.from && dataRange.to) {
                    let { from, to } = dataRange;
                    filters.createdAt = yield dateRange.dataRangePicker(from, to);
                }
                if (price && price.$gte && price.$lte) {
                    const { $gte, $lte } = price;
                    filters.allPrice = { $gte, $lte };
                }
                return filters;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new orderFilters();
