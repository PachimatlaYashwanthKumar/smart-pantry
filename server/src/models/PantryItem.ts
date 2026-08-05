import mongoose, { Document, Schema } from "mongoose";

export interface IPantryItem extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;

  quantity: number;
  unit: string;

  minimumStock: number;

  expiryDate?: Date;

  location?: string;

  createdAt: Date;
  updatedAt: Date;
}

const PantryItemSchema = new Schema<IPantryItem>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    minimumStock: {
      type: Number,
      default: 1,
      min: 0,
    },

    expiryDate: {
      type: Date,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

PantryItemSchema.index({
  userId: 1,
  productId: 1,
});

export default mongoose.model<IPantryItem>(
  "PantryItem",
  PantryItemSchema
);