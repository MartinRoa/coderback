import fs from "fs";
import productManager from "./ProductManager.js";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async loadData() {
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        }
    }

    async newCart() {
        await this.loadData();

        let cartId;
        if(this.carts.length){
            cartId = this.carts[this.carts.length - 1].id + 1;
        } else {
            cartId = 1;
        }

        this.carts.push({
            id: cartId,
            products: []
        })

        const productsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, productsString);
        return true;
    }

    async getCartById(idCart) {
        await this.loadData();
        const cart = this.carts.find((e) => e.id === idCart);

        if(cart){
            return cart;
        } else {
            return false;
        }
    }

    async addProductToCart(cid, pid) {
        await this.loadData();
        const cart = this.carts.find((e) => e.id === cid);
        const products = await productManager.getProducts();  
        const product = products.find((e) => e.id === pid);

        if(cart && product){
            const cartProduct = cart.products.find((e) => e.product === pid)
            if(cartProduct) {
                cartProduct.quantity = cartProduct.quantity + 1;
            } else {
                cart.products.push({
                    product: pid,
                    quantity: 1
                });
            };

            const productsString = JSON.stringify(this.carts);
            await fs.promises.writeFile(this.path, productsString);
            return cart;
        } else {
            return false;
        }
    }
}

export default new CartManager("carts.json");