const OrderHistory = require("../models/order-history");
const mongoose = require("mongoose");

let createNewOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderHistory.create({
                products: data.products,
                userId: data.userId,
                side_dishes: data.side_dishes,
                method: data.method,
                vendorId: data.vendorId,
                address: data.address,
                total: data.total,
            });

            resolve({
                errCode: 0,
                message: "Added order successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getAllOrderByUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderHistories = await OrderHistory.find({ userId: userId });
            resolve(orderHistories);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderHistories = await OrderHistory.find();
            resolve(orderHistories);
        } catch (e) {
            reject(e);
        }
    });
};

const updateStatusService = async (orderId) => {
    try {
        const result = await OrderHistory.updateOne(
            { _id: orderId },
            { status: "Đã thanh toán" }
        );

        if (result.modifiedCount > 0) {
            return { message: "Order updated successfully" };
        } else {
            return { message: "No order was updated" };
        }
    } catch (error) {
        throw new Error("Error updating order: " + error.message);
    }
};
let getTotalRevenueByVendorService = (vendorId, startDate, endDate) => {
      return new Promise(async (resolve, reject) => {
          try {
              let start = new Date(startDate);
              start.setHours(0, 0, 0, 0);  
              let end = new Date(endDate);
              end.setHours(23, 59, 59, 999);  
                let filter = {
                  vendorId: vendorId,
                  createdAt: { $gte: start, $lte: end }
              };
  
              let totalRevenue = await OrderHistory.aggregate([
                  { $match: filter },
                  { $group: { _id: null, totalSales: { $sum: "$total" } } }
              ]);
  
              resolve(totalRevenue[0]?.totalSales || 0); 
          } catch (e) {
              reject(e);
          }
      });
  };
  
    
    
  
module.exports = {
    createNewOrderService,
    getAllOrderService,
    updateStatusService,
    getAllOrderByUserService,
    getTotalRevenueByVendorService,
};
