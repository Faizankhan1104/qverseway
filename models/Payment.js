import mongoose from "mongoose";

const schema = new mongoose.Schema({
  txnid: {
    type: String,
    required: true,
  },
  payu_payment_id: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  email: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);
