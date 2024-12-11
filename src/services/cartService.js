import Cart from "../models/cart";

let createNewCartService = (data) => {
      return new Promise(async (resolve, reject) => {


            try {
                  await Cart.create({
                        idUser: data.idUser,
                        imageProduct: data.imageProduct,
                        nameProduct: data.nameProduct,
                        priceProduct: data.priceProduct,
                        number: data.number || 1,
                        quality: data.quality || "Standard",
                        sideDishId: data.sideDishId,
                        vendorId: data.vendorId
                  });

                  resolve({
                        errCode: 0,
                        message: "Added cart succeed",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

let getAllCartService = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let carts = await Cart.find();
                  resolve(carts);

            } catch (e) {
                  reject(e);
            }
      });
};

let deleteCartService = (CartId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let foundCart = await Cart.findOne(
                        { _id: CartId }
                  );
                  if (!foundCart) {
                        resolve({
                              errCode: 2,
                              errMessage: `Cart doesn't exist`,
                        });
                  } else {
                        await Cart.findByIdAndDelete(CartId);

                        resolve({
                              errCode: 0,
                              message: "Delete Cart duoc rui ",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

let updateCartService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing required parameters updateCartService",
                        });
                  }

                  const cart = await Cart.findOne({
                        _id: data.id,
                  });

                  if (cart) {
                        cart.number = data.number !== undefined ? data.number : cart.number;

                        await cart.save();

                        resolve({
                              errCode: 0,
                              message: "Update cart successfully!",
                        });
                  } else {
                        resolve({
                              errCode: 1,
                              errMessage: "Cart not found",
                        });
                  }

            } catch (e) {
                  reject(e);
            }
      });
};


module.exports = {
      createNewCartService, getAllCartService, deleteCartService, updateCartService,
};