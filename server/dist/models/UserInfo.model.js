import { model, Schema } from "mongoose";
const UserInfo = new Schema({
    fullName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    address: {
        city: { type: String },
        street: { type: String },
        postOffice: { type: String },
    },
});
export default model("UserInfo", UserInfo);
