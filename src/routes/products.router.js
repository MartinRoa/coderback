import { Router } from "express";
//import productManager from "../DAO/ProductManager.js";
import { uploader } from "../utils.js";
import ProductService from "../services/products.service.js";

const productsRouter = Router();

const Service = new ProductService();

// ENDPOINTS PRODUCTS WITH MONGODB

productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await Service.getProducts();

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
    const id = req.params.pid;
    try {
        const product = await Service.getProductById(id);
        res.status(200).json({
            status: "success",
            message: "Product found.",
            data: product
        });
    }
    catch {
        res.status(409).json({
            status: "error",
            message: "Product not exist!",
            data: {}
        });
    }
});

productsRouter.post("/", uploader.single("thumbnail"),async (req, res) => {
    const newProduct = req.body;
    if(req.file){
        newProduct.thumbnail = req.file.path;
    } else {
        newProduct.thumbnail = "Sin imagen.";
    }
    try {
        const product = await Service.addProduct(newProduct);
        res.status(200).json({
            status: "success",
            message: "Product successfully added.",
            data: product
        });
    }
    catch {
        res.status(409).json({
            status: "error",
            message: "The entered product already exists, or the information provided is incomplete.",
            data: {},
        });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    const idProd = req.params.pid;
    const updateProduct = req.body;
    try {
        const productUpdated = await Service.updateProduct(idProd, updateProduct);
        res.status(200).json({
            status: "success",
            message: "Product successfully modified.",
            data: productUpdated
        });
    }
    catch {
        res.status(409).json({
            status: "error",
            message: "Product not found or invalid information.",
            data: {}
        });
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const idToDelete = req.params.pid;
    try {
        const deleteProduct = await Service.deleteProduct(idToDelete);
        return res.status(200).json({
            status: "success",
            message: "Product successfully deleted.",
            data: deleteProduct
        });
    }
    catch {
        return res.status(409).json({
            status: "error",
            message: "Product not found",
            data: {}
        });
    }
});

// ENDPOINTS PRODUCTS WITH FILE SYSTEM

// productsRouter.get("/", async (req, res) => {
//     const limit = req.query.limit;
//     const products = await productManager.getProducts();

//     if(!limit) {
//         return res.status(200).json({
//             status: "success",
//             message: "List of products.",
//             data: products
//         });
//     } else if (limit > products.length) {
//         return res.status(409).json({
//             status: "error",
//             message: "The entered limit is higher than the number of products.",
//             data: {}
//         });
//     } else {
//         return res.status(200).json({
//             status: "success",
//             message: `The first ${limit} products of the list.`,
//             data: products.slice(0, limit)
//         });
//     }
// });

// productsRouter.get("/:pid", async (req, res) => {
//     const id = parseInt(req.params.pid);
//     const product = await productManager.getProductById(id);

//     if(product) {
//         res.status(200).json({
//             status: "success",
//             message: "Product found.",
//             data: product
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "Product not exist!",
//             data: {}
//         });
//     }
// });

// productsRouter.post("/", uploader.single("thumbnail"),async (req, res) => {
//     const newProduct = req.body;
//     if(req.file){
//         newProduct.thumbnail = req.file.path;
//     }
//     const products = await productManager.addProduct(newProduct);

//     if(products) {
//         res.status(200).json({
//             status: "success",
//             message: "Product successfully added.",
//             data: productManager.products[productManager.products.length - 1]
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "The entered product already exists, or the information provided is incomplete.",
//             data: {},
//         });
//     };
// });

// productsRouter.put("/:pid", async (req, res) => {
//     const idProd = parseInt(req.params.pid);
//     const updateProduct = req.body;
//     const update = await productManager.updateProduct(idProd, updateProduct);

//     if(update) {
//         res.status(200).json({
//             status: "success",
//             message: "Product successfully modified.",
//             data: productManager.products[productManager.products.findIndex(prod => prod.id === idProd)]
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "Product not found or invalid information.",
//             data: {}
//         });
//     };
// });

// productsRouter.delete("/:pid", async (req, res) => {
//     const idToDelete = parseInt(req.params.pid);
//     const deleteProduct = await productManager.deleteProduct(idToDelete);

//     if(deleteProduct) {
//         return res.status(200).json({
//             status: "success",
//             message: "Product successfully deleted.",
//             data: {}
//         });
//     } else {
//         return res.status(409).json({
//             status: "error",
//             message: "Product not found",
//             data: {}
//         });
//     };
// });

export default productsRouter;