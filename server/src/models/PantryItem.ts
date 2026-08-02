import { Schema, model, Document, Types } from "mongoose";

export interface IPantryItem extends Document {
  userId: Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: Date;
  location?: string;
  barcode?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const pantryItemSchema = new Schema<IPantryItem>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    expiryDate: {
      type: Date,
    },

    location: {
      type: String,
      trim: true,
    },

    barcode: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IPantryItem>("PantryItem", pantryItemSchema);