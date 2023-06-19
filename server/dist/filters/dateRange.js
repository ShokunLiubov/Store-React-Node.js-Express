var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class dateRange {
    dataRangePicker(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dateTo = new Date(to);
                dateTo.setHours(23, 59, 59, 999);
                const dateFrom = new Date(from);
                dateFrom.setHours(0, 0, 0, 0);
                return {
                    $gte: dateFrom,
                    $lte: dateTo,
                };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new dateRange();
