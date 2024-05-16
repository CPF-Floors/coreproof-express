import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "In process", "Completed"],
      default: "Pending"
    },
    productList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    estimatedTime: {
      type: Date,
      required: true,
      default: () => Date.now() + (2 * 7 * 24 * 60 * 60 * 1000)
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
