import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userMobile: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, default: "Success" },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema);

export default paymentModel;
