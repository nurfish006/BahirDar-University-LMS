
import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      trim: true,required: true,
    },
    department: {
      type: String,
     
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
    },
    experience: {
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
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    role: {
      type: [String],
      default: ["teacher"],
      enum: ["student", "teacher", "admin","head"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

export default mongoose.model("teacher", teacherSchema);
