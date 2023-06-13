import { model, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
import { EnumOrderStatus } from '../enums/orderStatus'
import { IOrderDocument, IOrderModel } from '../types/order.interface'

const OrderSchema = new Schema<IOrderDocument>({
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
})

OrderSchema.plugin(mongoosePaginate)
const Order: IOrderModel<IOrderDocument> = model<IOrderDocument>('Order', OrderSchema) as IOrderModel<IOrderDocument>

export default Order