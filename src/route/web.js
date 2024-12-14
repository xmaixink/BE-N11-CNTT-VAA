import express from "express";
import cartController from "../controllers/cartController";
import orderController from "../controllers/OrderController.js";
import productController from "../controllers/productController.js";
import sideDishController from "../controllers/sideDishController.js";
import userController from "../controllers/userController.js";
import vendorController from "../controllers/vendorController.js";


const vnpay = require("./vnpay.js");

let router = express.Router();

let initWebRoutes = (app) => {
	// auth
	router.post("/api/login", userController.loginUser);
	router.post("/api/register", userController.RegisterUser);

	// user
	router.get("/api/get-all-users", userController.getAllUser);
	router.post("/api/create-new-user", userController.createNewUser);
	router.delete("/api/delete-user", userController.deleteUser);
	router.put("/api/update-user", userController.updateUser);

	//vendor
	router.get("/api/get-all-vendors", vendorController.getAllVendors);
	router.post("/api/create-new-vendor", vendorController.resgisterNewVendor);
	router.post("/api/register-new-vendor", vendorController.verifyRegisterVendor);
	router.post("/api/login-vendor", vendorController.handleVendorLogin);

	//product
	router.post("/api/create-new-product", productController.createNewProduct);
	router.get("/api/get-all-product", productController.getAllProduct);
	router.delete("/api/delete-product", productController.deleteProduct);
	router.put("/api/update-product", productController.updateProduct);
	router.get("/api/search-product", productController.searchProducts);
	// router.put("/api/update-side-dishes-product", productController.updateSideDishProduct);

	//cart
	router.post("/api/create-new-cart", cartController.createNewCart);
	router.get("/api/get-all-cart", cartController.getAllCart);
	router.delete("/api/delete-cart", cartController.deleteCart);
	router.put("/api/update-cart", cartController.updateCart);

	//order
	router.post("/api/create-new-order", orderController.createNewOrder);
	router.post("/api/update-status-order/:orderId", orderController.updateStatusOrder);
	router.get("/api/get-all-order", orderController.getAllOrder);
	router.get("/api/get-order-user/:userId", orderController.getAllOrderByUser);
	router.get("/api/total-revenue", orderController.getTotalRevenueByVendor);


	//dishes
	router.post("/api/create-side-dish", sideDishController.createNewSideDish);
	router.get("/api/get-all-side-dishes", sideDishController.getAllSideDish);
	router.delete("/api/delete-side-dish", sideDishController.deleteSideDish);



	app.use("/api/v1/vnpay", vnpay);

	return app.use("/", router);
};

module.exports = initWebRoutes;