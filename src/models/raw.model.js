import mongoose from "mongoose";

const rawSchema = new mongoose.Schema({
  thickness: {
    type: String,
    default: 1
  },
  mils: {
    type: Number,
    default: 1
  },
  padding: {
    type: Number,
    default: 1
  },
  color: {
    type: String,
    default: "None"
  }
}, { timestamps: true });


export default mongoose.model("Raw", rawSchema);