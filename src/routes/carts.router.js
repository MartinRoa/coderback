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
    catch {
        res.status(409).json({
            status: "error",
            message: "Couldn't create cart",
            data: {}
        });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await Service.getCartById(id);
        res.status(200).json({
            status: "success",
            message: "Cart found.",
            data: cart
        });
    }
    catch {
        res.status(409).json({
            status: "error",
            message: "Cart not exist!",
            data: {}
        });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const addProductToCart = await Service.addProductToCart(cid, pid);
        res.status(200).json({
            status: "success",
            message: "Product added to cart successfully.",
            data: addProductToCart
        });
    }
    catch {
        res.status(409).json({
            status: "error",
            message: "Cart or product not exist.",
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