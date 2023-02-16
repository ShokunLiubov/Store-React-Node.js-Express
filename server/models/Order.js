import { model, Schema } from "mongoose"

const Order = new Schema({
  fullName: { type: String, required: true },
  allPrice: { type: Number },
  status: { type: String, required: true },
  products: [{ productId: { type: Schema.Types.ObjectId, ref: "Products" }, count: { type: Number } }],
  address: {
    city: { type: String },
    street: { type: String },
    postOffice: { type: String },
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
})

// Order.plugin(mongoosePaginate)
export default model("Order", Order)
