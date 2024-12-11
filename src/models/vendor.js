const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema(
      {
            email: {
                  type: String,
                  unique: true,
                  required: true,
            },
            nameVendor: {
                  type: String,
                  required: true,
            },
            password: {
                  type: String,
                  required: true,
            },
            phoneNumber: {
                  type: String,
                  required: true,
            },
            totalRestaurants: {
                  type: Number,
                  default: 0,
            }
      },
      {
            timestamps: true,
      }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;