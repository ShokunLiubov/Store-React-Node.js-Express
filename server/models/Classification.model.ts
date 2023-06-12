import { model, Schema } from "mongoose"

const Classification = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, }
})


export default model("Classification", Classification)
