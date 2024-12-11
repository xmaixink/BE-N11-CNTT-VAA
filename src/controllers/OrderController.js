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
module.exports = {

      createNewOrder,
      getAllOrder,
      updateStatusOrder,
      getAllOrderByUser,
};
