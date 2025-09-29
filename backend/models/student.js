
import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      
    },
    department: {
      type: String,
      trim: true,
      required: true,
   
    },
    year: {
      type: String,
      trim: true,
      required: true,
  
    },
    semister: {
      type: String,
      trim: true,
      required: true,
  
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["student"],
      enum: ["student", "teacher", "admin","head"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

export default mongoose.model("student", studentSchema);
