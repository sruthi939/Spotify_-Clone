import express from "express";
import { addPayment, listPayments } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post('/add', addPayment);
paymentRouter.get('/list', listPayments);

export default paymentRouter;
