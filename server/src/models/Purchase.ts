import mongoose, { Document, Schema } from "mongoose";

export interface IPurchaseItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  store: string;
  purchaseDate: Date;
  totalAmount: number;
  notes?: string;
  items: IPurchaseItem[];
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseItemSchema = new Schema<IPurchaseItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
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

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const PurchaseSchema = new Schema<IPurchase>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    store: {
      type: String,
      required: true,
      trim: true,
    },

    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    items: {
      type: [PurchaseItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPurchase>(
  "Purchase",
  PurchaseSchema
);