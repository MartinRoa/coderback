import { Router } from "express";
const productsRouter = Router();

import ProductManager from "../ProductManager.js";
const productManager = new ProductManager("products.json");

// ENDPOINTS PRODUCTS

productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if(!limit) {
        return res.status(200).json({
            status: "success",
            message: "List of products.",
            data: products
        });
    } else if (limit > products.length) {
        return res.status(409).json({
            status: "error",
            message: "The entered limit is higher than the number of products.",
            data: {}
        });
    } else {
        return res.status(200).json({
            status: "success",
            message: `The first ${limit} products of the list.`,
            data: products.slice(0, limit)
        });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    if(product) {
        res.status(200).json({
            status: "success",
            message: "Product found.",
            data: product
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "Product not exist!",
            data: {}
        });
    }
});

productsRouter.post("/", async (req, res) => {
    const newProduct = req.body;
    const products = await productManager.addProduct(newProduct);

    if(products) {
        res.status(200).json({
            status: "success",
            message: "Product successfully added.",
            data: productManager.products[productManager.products.length - 1]
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "The entered product already exists, or the information provided is incomplete.",
            data: {},
        });
    };
});

productsRouter.put("/:pid", async (req, res) => {
    const idProd = parseInt(req.params.pid);
    const updateProduct = req.body;
    const update = await productManager.updateProduct(idProd, updateProduct);

    if(update) {
        res.status(200).json({
            status: "success",
            message: "Product successfully modified.",
            data: productManager.products[productManager.products.findIndex(prod => prod.id === idProd)]
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "Product not found or invalid information.",
            data: {}
        });
    };
});

productsRouter.delete("/:pid", async (req, res) => {
    const idToDelete = parseInt(req.params.pid);
    const deleteProduct = await productManager.deleteProduct(idToDelete);
    console.log(deleteProduct)

    if(deleteProduct) {
        return res.status(200).json({
            status: "success",
            message: "Product successfully deleted.",
            data: {}
        });
    } else {
        return res.status(409).json({
            status: "error",
            message: "Product not found",
            data: {}
        });
    };
});

export default productsRouter;