import { model, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const UserInfo = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  address: {
    city: { type: String },
    street: { type: String },
    postOffice: { type: String },
  },
})

UserInfo.plugin(mongoosePaginate)
export default model("UserInfo", UserInfo)
