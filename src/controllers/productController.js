import productService from "../services/productService";

let createNewProduct = async (req, res) => {
    try {
        let message = await productService.createNewProductService(req.body);
        return res.status(200).json(message);
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getAllProduct = async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters product",
                products: []
            });
        }

        let products = await productService.getAllProductService(id);

        return res.status(200).json({
            errCode: 0,
            errMessage: "You got products successfully",
            products
        });
    } catch (error) {
        console.error("Error getting products:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let deleteProduct = async (req, res) => {
    try {
        let data = req.body.id;
        let message = await productService.deleteProductService(data);

        return res.status(200).json(message);
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let updateProduct = async (req, res) => {
    try {
        let data = req.body;

        let message = await productService.updateProductService(data);

        return res.status(200).json(message);
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let searchProducts = async (req, res) => {
    try {
        const searchQuery = req.query.name; // Lấy từ khóa tìm kiếm từ query string

        if (!searchQuery) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required search query",
                products: []
            });
        }

        const products = await productService.searchProductsService(searchQuery);

        return res.status(200).json({
            errCode: 0,
            errMessage: "Search products successfully",
            products
        });
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

module.exports = {
    createNewProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    searchProducts
};
