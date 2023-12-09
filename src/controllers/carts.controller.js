import { cartsService } from "../services/carts.service.js";

class CartsController {
    async createNewCart(req, res) {
        try {
            const newCart = await cartsService.newCart();
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
    }

    async getCartById(req, res) {
        try {
            const id = req.params.cid;
            const cart = await cartsService.getCartById(id);
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
    }

    async addProductToCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const addedProduct  = await cartsService.addProductToCart(cid, pid, 1);
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
    }

    async deleteProductToCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const deleteProductToCart = await cartsService.deleteProductToCart(cid, pid);
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
    }

    async emptyCart(req, res) {
        try {
            const id = req.params.cid;
            const cart = await cartsService.emptyCart(id);
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
    }

    async updateProductQty(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const newQty = req.body.quantity;
            const updateProductQty = await cartsService.updateProductQty(cid, pid, newQty);
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
    }

    async updateAllCart(req, res) {
        try {
            const id = req.params.cid;
            const updateCart = req.body;
            const cart = await cartsService.updateAllCart(id, updateCart);
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
    }

    async showCartById(req, res) {
        try {
            const id = req.params.cid;
            const cart = await cartsService.getCartById(id);
    
            const finalData = [];
    
            cart.products.map(prod => {
                finalData.push({
                    id: prod.product._id,
                    title: prod.product.title,
                    price: prod.product.price,
                    quantity: prod.quantity
                })
            })
            
            return res.status(200).render("cart", {cart: req.session.user.cart, finalData});
        }
        catch (error) {
            res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async finalizePurchase(req, res) {
        try {
            const id = req.params.cid;
            const user = req.session.user.email;
            const purchase = await cartsService.finalizePurchase(id, user);
            res.status(200).json({
                status: "success",
                message: "Purchase successfully completed.",
                data: purchase
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
}

export const cartsController = new CartsController;