var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Classification from '../models/Classification.model';
class seedingClassification {
    createClassification() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classification = [
                    { name: 'Pharmacy', slug: 'pharmacy' },
                    { name: 'Elite', slug: 'elite' },
                    { name: 'Dermatocosmetic', slug: 'dermatocosmetic' },
                    { name: 'Mac market', slug: 'mac-market' },
                    { name: 'Middle Up', slug: 'middle-up' },
                    { name: 'middle-market', slug: 'Middle Market' },
                    { name: 'Natural', slug: 'natural' },
                    { name: 'Nisheva', slug: 'nisheva' },
                    { name: 'Organic', slug: 'organic' },
                    { name: 'Professional', slug: 'professional' }
                ];
                for (let i = 0; i < classification.length; i++) {
                    yield Classification.create(classification[i]);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
export default new seedingClassification();
