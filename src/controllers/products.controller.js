import { productsService } from "../services/products.service.js";

class ProductsController {
    async getProducts(req, res) {
        try {
            const limit = req.query.limit;
            const products = await productsService.getProducts();
            if(!limit) {
                return res.status(200).json({
                    status: "success",
                    message: "List of products.",
                    data: products
                });
            } else if (limit > products.length) {
                throw new Error("The entered limit is higher than the number of products.");
            } else {
                return res.status(200).json({
                    status: "success",
                    message: `The first ${limit} products of the list.`,
                    data: products.slice(0, limit)
                });
            }
        }
        catch (error) {
            return res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async getProductById(req, res) {
        try {
            const id = req.params.pid;
            const product = await productsService.getProductById(id);
            res.status(200).json({
                status: "success",
                message: "Product found.",
                data: product
            });
        }
        catch (error) {
            res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async addProduct(req, res, next) {
        try {
            const newProduct = req.body;
            if(req.file){
                newProduct.thumbnail = req.file.path;
            } else {
                newProduct.thumbnail = "Sin imagen.";
            }
            const product = await productsService.addProduct(newProduct);
            res.status(200).json({
                status: "success",
                message: "Product successfully added.",
                data: product
            });
        }
        catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res) {
        try {
            const idProd = req.params.pid;
            const updateProduct = req.body;
            const productUpdated = await productsService.updateProduct(idProd, updateProduct);
            res.status(200).json({
                status: "success",
                message: "Product successfully modified.",
                data: productUpdated
            });
        }
        catch (error) {
            res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const idToDelete = req.params.pid;
            const deleteProduct = await productsService.deleteProduct(idToDelete);
            return res.status(200).json({
                status: "success",
                message: "Product successfully deleted.",
                data: deleteProduct
            });
        }
        catch (error) {
            return res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async showProductsList(req, res) {
        try {
            const { limit, page, category, status, sort } = req.query;
            const finalData = await productsService.showProductsList(req, res, limit, page, category, status, sort);
            return res.status(200).render("products", {finalData});
        } 
        catch {
            return res.status(409).json({
                status: "error",
                message: "Could not get the product list.",
            });
        }
    }
}

export const productsController = new ProductsController();