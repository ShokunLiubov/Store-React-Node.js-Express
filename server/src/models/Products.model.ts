import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IProductsDocument, IProductsModel } from '../types/product.interface'

const OrderSchema = new Schema<IProductsDocument>({
	image: { type: String, required: true },
	title: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	classification: { type: Schema.Types.ObjectId, ref: 'Classification' },
	price: { type: Number, required: true },
	count: { type: Number, required: true },
	gender: { type: String, required: true },
	volume: { type: String, required: true },
	type_of_aroma: { type: String, required: true },
	country_of_TM: { type: String, required: true },
	made_in: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
})

OrderSchema.plugin(mongoosePaginate)
OrderSchema.index({ title: 1, price: -1 }, { name: 'title' })
// export default model("Products", Products)

const Products: IProductsModel<IProductsDocument> = model<IProductsDocument>(
	'Products',
	OrderSchema,
) as IProductsModel<IProductsDocument>

export default Products
