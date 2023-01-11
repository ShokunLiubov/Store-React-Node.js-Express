// import { IOrder } from "../../src/shared/interfaces/order.interface";
import { Schema, model } from "mongoose";

const Order = new Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  allPrice: { type: Number, required: true },
  status: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

export default model("Order", Order);
