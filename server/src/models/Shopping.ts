import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IShopping extends Document {
  userId: mongoose.Types.ObjectId;

  productId: mongoose.Types.ObjectId;

  productName: string;

  quantity: number;

  unit: string;

  completed: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const ShoppingSchema =
  new Schema<IShopping>(
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

      productName: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },

      unit: {
        type: String,
        required: true,
      },

      completed: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

ShoppingSchema.index({
  userId: 1,
  productId: 1,
});

export default mongoose.model<IShopping>(
  "Shopping",
  ShoppingSchema
);