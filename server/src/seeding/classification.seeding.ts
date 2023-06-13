import Classification from '../models/Classification.model'

class seedingClassification {

    async createClassification() {
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
            ]

            for (let i = 0; i < classification.length; i++) {
                await Classification.create(classification[i])
            }


        } catch (e) {
            console.log(e)
        }

    }

}
export default new seedingClassification()