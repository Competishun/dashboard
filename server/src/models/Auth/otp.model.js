import mongoose from "mongoose";

const otpStoreSchema = new mongoose.Schema(
  {
    deleted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: "",
    },
    requestId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpStoreSchema);
