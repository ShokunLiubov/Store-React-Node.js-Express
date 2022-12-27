const { Schema, model } = require("mongoose");

const UserInfo = new Schema({
  email: { type: String, unique: true },
  phone: { type: String },
  city: { type: String },
});

module.exports = model("UserInfo", UserInfo);
