
import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
    },
    lname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },

    role: {
      type: [String],
      default: ["admin"],
      enum: ["student", "teacher", "admin","head"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
