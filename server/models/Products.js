import { model, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const Products = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  classification: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  gender: { type: String, required: true },
  volume: { type: String, required: true },
  type_of_aroma: { type: String, required: true },
  country_of_TM: { type: String, required: true },
  made_in: { type: String, required: true },
  description: { type: String, required: true },
})

Products.plugin(mongoosePaginate)
Products.index({ title: 1, price: -1 }, { name: 'title' })
export default model("products", Products)
