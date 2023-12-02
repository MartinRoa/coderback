import { cartsModel } from "../DAO/models/carts.model.js";
import { productsService } from "./products.service.js";

class CartsService {
    async newCart() {
        const cartCreated = await cartsModel.create({products: []});
        if (!cartCreated) {
            throw new Error("Cart could not be created.");
        }
        return cartCreated;
    }

    async getCartById(idCart) {
        const cart = await cartsModel.findOne({_id: idCart});
        if (!cart) {
            throw new Error("Cart not found.");
        }
        return cart;
    }

    async updateCart(idCart, updateCart){
        const cartUptaded = await cartsModel.updateOne({ _id: idCart }, updateCart);
        return cartUptaded;
    }

    async addProductToCart(cid, pid, qty) {
        const cart = await this.getCartById(cid); 
        const product = await productsService.getProductById(pid);

        if(cart && product){
            const existingProduct = cart.products.find((p) => p.product._id.toString() === pid.toString());
            if (existingProduct) {
                existingProduct.quantity += qty;
            } else {
                const newProduct = {
                  product: pid,
                  quantity: qty
                };
                cart.products.push(newProduct);
            }
            const cartUpdated = await this.updateCart(cid, cart);
            return cartUpdated;
        } else {
            throw new Error("Cart or product not exist.");
        }
    }

    async deleteProductToCart(cid, pid) {
        const cart = await this.getCartById(cid); 
        const product = await productsService.getProductById(pid);

        if(cart && product){
            const cartUpdated = await cartsModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } }});
            return cartUpdated;
        } else {
            throw new Error("Cart or product not exist.");
        }
    }

    async emptyCart(cid) {
        const cart = await this.getCartById(cid);

        if (cart) {
            const cartUpdated = await cartsModel.updateOne({ _id: cid }, { $set: { products: [] } });
            return cartUpdated;
        } else {
            throw new Error("Cart not exist.");
        }
    }

    async updateAllCart(idCart, updateCart){
        const emptyCart = await this.emptyCart(idCart);
        if(emptyCart) {
            for (const prod of updateCart) {
                await this.addProductToCart(idCart, prod.product, prod.quantity);
            }
            return await this.getCartById(idCart);
        } else {
            throw new Error("Cart not found or invalid information.");
        }
    }

    async updateProductQty(cid, pid, newQty) {
        const cart = await this.getCartById(cid);

        if(cart){
            const cartUpdated = await cartsModel.updateOne({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": newQty } });
            if(cartUpdated.modifiedCount === 0){
                throw new Error('Product not exist or not is included into the cart!');
            } else {
                return cartUpdated;
            }
        } else {
            throw new Error('Cart not exist.');
        }
    }
}

export const cartsService = new CartsService;;