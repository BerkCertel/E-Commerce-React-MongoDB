const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true }, // "name" yerine "rating" olarak düzeltildi
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    reviews: [ReviewSchema],
    colors: [{ type: String, required: true }],
    sizes: [{ type: String }],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number, required: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
