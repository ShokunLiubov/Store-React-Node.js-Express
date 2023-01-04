import { Schema, model } from "mongoose";

const Role = new Schema({
  value: { type: String, unique: true, default: "USERS" },
});

// module.exports = model("Role", Role);
export default model("Role", Role);
