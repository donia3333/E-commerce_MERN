import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model<Product>("Product", productSchema);

export default productModel;
