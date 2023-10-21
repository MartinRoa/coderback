import { Router } from "express";
// import cartManager from "../DAO/CartManager.js";
import CartService from "../services/carts.service.js";

const cartsRouter = Router();

const Service = new CartService;

// ENDPOINTS CARTS WITH MONGODB

cartsRouter.post("/", async (req, res) => {
    try {
        const newCart = await Service.newCart();
        res.status(200).json({
            status: "success",
            message: "Cart created successfully.",
            data: newCart
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await Service.getCartById(id);
        res.status(200).json({
            status: "success",
            message: "Cart found.",
            data: cart
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const addedProduct  = await Service.addProductToCart(cid, pid, 1);
        res.status(200).json({
            status: "success",
            message: "Product added to cart successfully.",
            data: addedProduct 
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const deleteProductToCart = await Service.deleteProductToCart(cid, pid);
        res.status(200).json({
            status: "success",
            message: "Product deleted to cart successfully.",
            data: deleteProductToCart
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await Service.emptyCart(id);
        res.status(200).json({
            status: "success",
            message: "Cart emptied.",
            data: cart
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const newQty = req.body.quantity;
        const updateProductQty = await Service.updateProductQty(cid, pid, newQty);
        res.status(200).json({
            status: "success",
            message: "Product quantity updated successfully.",
            data: updateProductQty
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

cartsRouter.put("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const updateCart = req.body;
        const cart = await Service.updateAllCart(id, updateCart);
        res.status(200).json({
            status: "success",
            message: "Cart successfully updated.",
            data: cart
        });
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

// ENDPOINTS CARTS WITH FILE SYSTEM

// cartsRouter.post("/", async (req, res) => {
//     const newCart = await cartManager.newCart();

//     if(newCart) {
//         res.status(200).json({
//             status: "success",
//             message: "Cart created successfully.",
//             data: cartManager.carts[cartManager.carts.length - 1]
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "Couldn't create cart",
//             data: {}
//         });
//     }
// });

// cartsRouter.get("/:cid", async (req, res) => {
//     const id = parseInt(req.params.cid);
//     const cart = await cartManager.getCartById(id);

//     if(cart) {
//         res.status(200).json({
//             status: "success",
//             message: "Cart found.",
//             data: cart.products
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "Cart not exist!",
//             data: {}
//         });
//     }
// });

// cartsRouter.post("/:cid/product/:pid", async (req, res) => {
//     const cid = parseInt(req.params.cid);
//     const pid = parseInt(req.params.pid);
//     const addProductToCart = await cartManager.addProductToCart(cid, pid);

//     if(addProductToCart) {
//         res.status(200).json({
//             status: "success",
//             message: "Product added to cart successfully.",
//             data: addProductToCart
//         });
//     } else {
//         res.status(409).json({
//             status: "error",
//             message: "Cart or product not exist.",
//             data: {}
//         });
//     }
// });

export default cartsRouter;