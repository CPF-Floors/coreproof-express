import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      enum: ["Floor", "Step", "Molding", "Baseboard", "Underlayment"],
    },
    material: {
      type: String,
      enum: ["Vinyl", "Laminate"],
    },
    description: {
        type: String, 
        required: true
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);