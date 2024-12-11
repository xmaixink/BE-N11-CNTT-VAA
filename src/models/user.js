const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
      {
            email: {
                  type: String,
                  unique: true,
                  required: true,
            },
            name: {
                  type: String,
                  required: [true, "PLease enter User name"],
            },
            password: {
                  type: String,
                  required: true,
            },
            phoneNumber: {
                  type: String,
                  required: false,
            },
      },
      {
            timestamps: true,
      }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;