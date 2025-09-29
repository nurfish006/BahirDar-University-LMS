
import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    cname: {
      type: String,
      trim: true,
      required: true,
    },
   ccode: {
      type: String,
      trim: true,
      required: true,
    },
    ccredit: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    }
    
});

export default mongoose.model("EEcourse", courseSchema);
