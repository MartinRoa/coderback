import { Router } from "express";
import CartService from "../services/carts.service.js";

const cartHTMLRouter = Router();

const Service = new CartService;

// ENDPOINTS CARTS WITH MONGODB

cartHTMLRouter.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await Service.getCartById(id);

        const finalData = []

        cart.products.map(prod => {
            finalData.push({
                title: prod.product.title,
                price: prod.product.price,
                quantity: prod.quantity
            })
        })
        
        return res.status(200).render("cart", {finalData});
    }
    catch (error) {
        res.status(409).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

export default cartHTMLRouter;