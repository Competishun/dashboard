const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;
const otpStoreSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  cDate: {
    type: Number,
    required: true,
  },
  uDate: {
    type: Number,
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  phoneNumber: {
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
});

mongoose.model("otpStore", otpStoreSchema);
