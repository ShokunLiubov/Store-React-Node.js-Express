import { model, Schema } from "mongoose"

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  userInfo: { type: Schema.Types.ObjectId, ref: "UserInfo" },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
})

// User.plugin(mongoosePaginate)
export default model("User", User)
