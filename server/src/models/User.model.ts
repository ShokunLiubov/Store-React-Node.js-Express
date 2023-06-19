import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
	userInfo: { type: Schema.Types.ObjectId, ref: 'UserInfo' },
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
})

User.plugin(mongoosePaginate)
export default model('User', User)
