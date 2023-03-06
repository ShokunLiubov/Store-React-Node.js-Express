import { model, Schema } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const Role = new Schema({
  value: { type: String, unique: true, },
})

Role.plugin(mongoosePaginate)
export default model("Role", Role)
