import { model, Schema } from 'mongoose'

const Category = new Schema({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true },
})

export default model('Category', Category)
