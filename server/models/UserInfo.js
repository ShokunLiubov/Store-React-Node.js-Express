import { Schema, model } from "mongoose";

const UserInfo = new Schema({
  email: { type: String, unique: true },
  phone: { type: String },
  city: { type: String },
});

export default model("UserInfo", UserInfo);
