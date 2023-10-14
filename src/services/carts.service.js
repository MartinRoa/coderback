import { cartModel } from "../DAO/models/cart.model.js";
import ProductService from "./products.service.js";

const productService = new ProductService;

class CartService {
    async newCart() {
        const cartCreated = await cartModel.create({products: []});
        return cartCreated;
    }

    async getCartById(idCart) {
        const cart = await cartModel.find({_id: idCart});
        return cart;
    }

    async updateCart(idCart, updateCart){
        const cartUptaded = await cartModel.updateOne({ _id: idCart }, updateCart);
        return cartUptaded;
    }

    async addProductToCart(cid, pid) {
        const [ cart ] = await this.getCartById({_id: cid}); 
        const product = await productService.getProductById({_id: pid});

        if(cart && product){
            cart.products.push({
                product: pid,
                quantity: 1
            });
            const cartUpdated = await this.updateCart(cid, cart);
            return cartUpdated;
        } else {
            return false;
        }
    }
}

export default CartService;