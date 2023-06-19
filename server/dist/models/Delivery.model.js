import { model, Schema } from "mongoose";
const Delivery = new Schema({
    deliveryType: {
        type: String,
        enum: ['postal', 'courier'],
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});
export default model("Delivery", Delivery);
