import paymentModel from "../models/paymentModel.js";

const addPayment = async (req, res) => {
    try {
        const { userId, userMobile, planName, amount, paymentMethod } = req.body;

        const newPayment = new paymentModel({
            userId,
            userMobile,
            planName,
            amount,
            paymentMethod
        });

        await newPayment.save();
        res.json({ success: true, message: "Payment recorded successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error recording payment" });
    }
}

const listPayments = async (req, res) => {
    try {
        const payments = await paymentModel.find({});
        res.json({ success: true, payments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching payments" });
    }
}

export { addPayment, listPayments };
