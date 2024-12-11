import SideDish from "../models/SideDish"; // Đảm bảo import model SideDish
const mongoose = require('mongoose');  // Đảm bảo mongoose được import đúng

let createNewSideDishService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra nếu thiếu tên hoặc giá
      if (!data.name || !data.price) {
        reject({
          errCode: 1,
          errMessage: "Missing required fields: name and price are required."
        });
      }

      const newSideDish = new SideDish({
        vendorId: data.vendorId,
        name: data.name,
        price: data.price,
        image: data.image,
      });

      await newSideDish.save(); // Lưu vào MongoDB

      resolve({
        errCode: 0,
        message: "Side dish created successfully",
      });
    } catch (error) {
      console.error("Error creating side dish:", error);
      reject({
        errCode: 1,
        message: "Error creating side dish",
        error: error.message,
      });
    }
  });
};

let getAllSideDishService = (id = "ALL") => {
  return new Promise(async (resolve, reject) => {
    try {
      let sideDishes;
      if (id === "ALL") {
        sideDishes = await SideDish.find();
      } else {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          reject(new Error("Invalid ID format"));
          return;
        }
        sideDishes = await SideDish.findOne({ _id: id });
      }
      if (!sideDishes || (Array.isArray(sideDishes) && sideDishes.length === 0)) {
        resolve([]);
      } else {
        resolve(sideDishes);
      }

    } catch (e) {
      console.error("Error in getAllSideDishService:", e);
      reject(e);
    }
  });
};

let deleteSideDishService = (sideDishId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundsideDish = await SideDish.findOne(
        { _id: sideDishId }
      );
      if (!foundsideDish) {
        resolve({
          errCode: 2,
          errMessage: `The product doesn't exist`
        });
      }
      await SideDish.findByIdAndDelete(sideDishId);

      resolve({
        errCode: 0,
        message: "Delete Product rui ",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewSideDishService,
  getAllSideDishService,
  deleteSideDishService
};
