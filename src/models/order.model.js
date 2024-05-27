import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["Pending", "In process", "Completed"],
      default: "Pending"
    },
    productList: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    estimatedTime: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);
