import { faker } from '@faker-js/faker'
import { GENDER } from '../enums/gender'
import Category from '../models/Category.model'
import Classification from '../models/Classification.model'
import Products from '../models/Products.model'

class seedingProducts {

    async createProducts(countProduct: any) {
        const typeAroma = [
            'Aldehydes', 'Amber', 'Aromatic', 'Vanilla',
            'Water', 'Gourmet', 'Wooden', 'Greens',
            'Earthy', 'Floral', 'Marine', 'Musky',
            'Spicy', 'Fresh'
        ]

        const image = [
            "dolce-gabbana-the-only-one.jpeg", "black-opiun-2.webp",
            "black-opium.jpeg", "49958_f.jpeg", "imperatrice-3.jpeg",
            "kirke.jpg", "versace-BC.jpeg"
        ]

        const keysGender = Object.keys(GENDER)
        const category = await Category.find()
        const classification = await Classification.find()

        try {
            for (let i = 1; i <= countProduct; i++) {
                const randomCategory = Math.floor(Math.random() * category.length)
                const randomClassification = Math.floor(Math.random() * classification.length)
                const gender = keysGender[Math.floor(Math.random() * keysGender.length)]
                //GENDER[gender]
                await Products.create({
                    image: "./../../image_product/" + image[Math.floor(Math.random() * image.length)],
                    title: faker.commerce.productName(),
                    category: category[randomCategory]._id,
                    classification: classification[randomClassification]._id,
                    price: faker.commerce.price(100, 1000, 0),
                    count: faker.datatype.number({ min: 1, max: 100 }),
                    gender: 'man',
                    volume: faker.datatype.number({ min: 100, max: 1000 }),
                    type_of_aroma: typeAroma[Math.floor(Math.random() * typeAroma.length)],
                    country_of_TM: faker.address.county(),
                    made_in: faker.address.county(),
                    description: faker.commerce.productDescription(),
                })
            }

        } catch (e) {
            console.log(e)
        }

    }

}
export default new seedingProducts()