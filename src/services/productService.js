import Product from "../models/product";

let createNewProductService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {

                  await Product.create({
                        vendorId: data.vendorId,
                        image: data.image,
                        name: data.name,
                        description: data.description,
                        ingredients: data.ingredients,
                        price: data.price,
                        category: data.category,
                        sideDishId: data.sideDishId
                  });

                  resolve({
                        errCode: 0,
                        message: "Added Product succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}
let getAllProductService = (productId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let products = "";
                  if (productId === "ALL") {
                        products = await Product.find();
                  }
                  if (productId && productId != 'ALL') {
                        products = await Product.findOne({ _id: productId });
                  }

                  resolve(products);

            } catch (e) {
                  reject(e);
            }
      });
};
let deleteProductService = (productId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let foundProduct = await Product.findOne(
                        { _id: productId }
                  );
                  if (!foundProduct) {
                        resolve({
                              errCode: 2,
                              errMessage: `The product doesn't exist`
                        });
                  }
                  await Product.findByIdAndDelete(productId);

                  resolve({
                        errCode: 0,
                        message: "Delete Product rui ",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};
let updateProductService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing required parameters updateProductService"
                        });
                  }

                  const product = await Product.findOne({
                        _id: data.id,
                  });

                  if (product) {
                        product.name = data.name;
                        product.price = data.price;
                        product.description = data.description;
                        product.ingredients = data.ingredients;
                        product.image = data.image;
                        product.category = data.category;

                        await product.save();

                        resolve({
                              errCode: 0,
                              message: "Update the product succeeds!"
                        });
                  } else {
                        resolve({
                              errCode: 1,
                              errMessage: "Product not found"
                        });
                  }

            } catch (e) {
                  reject(e);
            }
      });
};

let updateSideDishProduct = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.idProduct) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing required parameters updateProductService"
                        });
                  }

                  const product = await Product.findOne({
                        _id: data.idProduct,
                  });

                  if (product) {

                        if (!Array.isArray(product.sideDishId)) {
                              product.sideDishId = [];
                        }

                        // Thêm `data._id` vào mảng `sideDishId` (đảm bảo không trùng lặp nếu cần)
                        if (!product.sideDishId.includes(data._id)) { // Tránh trùng lặp
                              product.sideDishId.push(data._id);
                        }
                        await product.save();

                        resolve({
                              errCode: 0,
                              message: "Update the product succeeds!"
                        });
                  } else {
                        resolve({
                              errCode: 1,
                              errMessage: "Product not found"
                        });
                  }

            } catch (e) {
                  reject(e);
            }
      });
};

let searchProductsService = (searchQuery) => {
      return new Promise(async (resolve, reject) => {
            try {
                  // Kiểm tra nếu từ khóa tìm kiếm không tồn tại
                  if (!searchQuery) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing search query",
                        });
                  }

                  // Tìm kiếm sản phẩm theo tên (không phân biệt chữ hoa/thường)
                  const products = await Product.find({
                        name: { $regex: searchQuery, $options: "i" },
                  });

                  // Trả về danh sách sản phẩm tìm thấy
                  resolve({
                        errCode: 0,
                        data: products,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      createNewProductService, getAllProductService, deleteProductService, updateProductService, searchProductsService
};