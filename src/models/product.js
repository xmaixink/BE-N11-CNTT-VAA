const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
      {
            vendorId: {
                  type: String,
                  required: true,
            },
            image: {
                  type: String,
                  required: true,
            },
            name: {
                  type: String,
                  required: true,
            },
            description: {
                  type: String,
                  required: true,
            },
            ingredients: {
                  type: String,
                  required: true,
            },
            category: {
                  type: String,
                  required: true,
            },
            price: {
                  type: Number,
                  required: true,
            },
            sideDishId: {
                  type: Array,
                  required: false,
            }
      },
      {
            timestamps: true,
      }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;