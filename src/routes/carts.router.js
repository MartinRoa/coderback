import { Router } from "express";
import cartManager from "../services/CartManager.js";

const cartsRouter = Router();

// ENDPOINTS CARTS

cartsRouter.post("/", async (req, res) => {
    const newCart = await cartManager.newCart();

    if(newCart) {
        res.status(200).json({
            status: "success",
            message: "Cart created successfully.",
            data: cartManager.carts[cartManager.carts.length - 1]
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "Couldn't create cart",
            data: {}
        });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(id);

    if(cart) {
        res.status(200).json({
            status: "success",
            message: "Cart found.",
            data: cart.products
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "Cart not exist!",
            data: {}
        });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const addProductToCart = await cartManager.addProductToCart(cid, pid);

    if(addProductToCart) {
        res.status(200).json({
            status: "success",
            message: "Product added to cart successfully.",
            data: addProductToCart
        });
    } else {
        res.status(409).json({
            status: "error",
            message: "Cart or product not exist.",
            data: {}
        });
    }
});

export default cartsRouter;