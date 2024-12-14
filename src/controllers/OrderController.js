import orderService from "../services/orderService";

let createNewOrder = async (req, res) => {
    let message = await orderService.createNewOrderService(req.body);
    return res.status(200).json(message);
};

let getAllOrder = async (req, res) => {
    let carts = await orderService.getAllOrderService();

    return res.status(200).json({
        errCode: 0,
        errMessage: "You got order successfully",
        carts,
    });
};

let getAllOrderByUser = async (req, res) => {
    let orders = await orderService.getAllOrderByUserService(req.params.userId);

    return res.status(200).json({
        errCode: 0,
        errMessage: "You got order successfully",
        orders,
    });
};

let updateStatusOrder = async (req, res) => {
    const { orderId } = req.params;
    let carts = await orderService.updateStatusService(orderId);

    return res.status(200).json({
        errCode: 0,
        errMessage: "You update order successfully",
        carts,
    });
};
let getTotalRevenueByVendor = async (req, res) => {
      try {
          const { vendorId, startDate, endDate } = req.query;
  
          if (!vendorId || !startDate || !endDate) {
              return res.status(400).json({
                  errCode: 1,
                  errMessage: "Missing required parameters: vendorId, startDate, or endDate",
              });
          }
            let start = new Date(startDate);
            let end = new Date(endDate);
            if (isNaN(start) || isNaN(end)) {
              return res.status(400).json({
                  errCode: 2,
                  errMessage: "Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).",
              });
          }
            const totalRevenue = await orderService.getTotalRevenueByVendorService(vendorId, start, end);
  
          return res.status(200).json({ totalRevenue });
      } catch (e) {
          return res.status(500).json({
              errCode: -1,
              message: `Error from server: ${e.message}`,
          });
      }
  };
  

module.exports = {
    createNewOrder,
    getAllOrder,
    updateStatusOrder,
    getAllOrderByUser,
    getTotalRevenueByVendor,
};
