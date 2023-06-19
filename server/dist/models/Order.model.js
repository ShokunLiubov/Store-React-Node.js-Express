import { model, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { EnumOrderStatus } from '../enums/orderStatus';
const OrderSchema = new Schema({
    fullName: { type: String, required: true },
    allPrice: { type: Number },
    status: { type: String,
        enum: Object.values(EnumOrderStatus),
        default: EnumOrderStatus.AVAILABILITY_IS_CHECK,
        required: true,
    },
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
});
OrderSchema.plugin(mongoosePaginate);
const Order = model('Order', OrderSchema);
export default Order;
