var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class productFilters {
    productFilters(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search, category, count, price, classification, type_of_aroma, made_in, country_of_TM, volume, gender } = query;
                const filters = {};
                if (search) {
                    filters.title = new RegExp(`${search}`, "i");
                }
                if (category) {
                    const categories = category.split(',');
                    filters.category = { $in: categories };
                }
                if (classification) {
                    const classifications = classification.split(',');
                    filters.classification = { $in: classifications };
                }
                if (gender) {
                    const genders = gender.split(',');
                    filters.gender = { $in: genders };
                }
                if (type_of_aroma) {
                    const typeAroma = type_of_aroma.split(',');
                    filters.type_of_aroma = { $in: typeAroma };
                }
                if (made_in) {
                    const madeIn = made_in.split(',');
                    filters.made_in = { $in: madeIn };
                }
                if (country_of_TM) {
                    const countryTM = country_of_TM.split(',');
                    filters.country_of_TM = { $in: countryTM };
                }
                if (count && count.$gte && count.$lte) {
                    const { $gte, $lte } = count;
                    filters.count = { $gte, $lte };
                }
                if (price) {
                    const { $gte, $lte } = price;
                    filters.price = { $gte, $lte };
                }
                if (volume && volume.$gte && volume.$lte) {
                    const { $gte, $lte } = volume;
                    filters.volume = { $gte, $lte };
                }
                return filters;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new productFilters();
