import fs from "fs";

class Carts {
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
            cartId = parseInt(this.carts[this.carts.length - 1]._id) + 1;
        } else {
            cartId = 1;
        }

        this.carts.push({
            _id: cartId.toString(),
            products: []
        })

        const productsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, productsString);
        return true;
    }

    async getCartById(idCart) {
        await this.loadData();
        const cart = this.carts.find((e) => e._id === idCart);

        if(cart){
            return cart;
        } else {
            return false;
        }
    }

    async updateCart(idCart, updateCart){
        await this.loadData();
        const cart = this.carts.find((e) => e._id === idCart);

        if(cart){
            const cartIndex = this.carts.findIndex((c) => c._id === cart._id);
            this.carts.splice(cartIndex, 1, {...cart, ...updateCart});
            const cartsString = JSON.stringify(this.carts);
            await fs.promises.writeFile(this.path, cartsString);
            return true;
        } else {
            return false;
        }
    }

    async deleteCart(idCart) {
        await this.loadData();
        const cart = this.carts.find((e) => e._id === idCart);

        if(cart){
            const updateList = this.carts.filter(c => c._id !== cart._id);
            const cartsString = JSON.stringify(updateList);
            await fs.promises.writeFile(this.path, cartsString);
            return true;
        } else {
            return false;
        }
    }

    async deleteProductToCart(cid, pid) {
        await this.loadData();
        const cart = this.carts.find((e) => e._id === cid);
        const prodIndex = cart.products.findIndex((p) => p._id === pid);
        cart.products.splice(prodIndex, 1);
        const cartsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, cartsString);
        return cart;
    }

    async emptyCart(cid) {
        await this.loadData();
        const cart = this.carts.find((e) => e._id === cid);
        const cartIndex = this.carts.findIndex((c) => c._id === cart._id);
        this.carts.splice(cartIndex, 1, {id: cid, products: []});
        const cartsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, cartsString);
        const updateCart = this.carts.find((e) => e._id === cid)
        return updateCart; 
    }

    async updateProductQty(cid, pid, newQty) {
        await this.loadData();
        const cart = this.carts.find((e) => e._id === cid);
        const cartProduct = cart.products.find((e) => e.product === pid)
        cartProduct.quantity = newQty;
        const cartsString = JSON.stringify(this.carts);
        await fs.promises.writeFile(this.path, cartsString);
        return cart;
    }
}

export default new Carts("src/database/carts.json");

// async addProductToCart(cid, pid) {
//     await this.loadData();
//     const cart = this.carts.find((e) => e.id === cid);
//     const products = await productManager.getProducts();  
//     const product = products.find((e) => e.id === pid);

//     if(cart && product){
//         const cartProduct = cart.products.find((e) => e.product === pid)
//         if(cartProduct) {
//             cartProduct.quantity = cartProduct.quantity + 1;
//         } else {
//             cart.products.push({
//                 product: pid,
//                 quantity: 1
//             });
//         };

//         const productsString = JSON.stringify(this.carts);
//         await fs.promises.writeFile(this.path, productsString);
//         return cart;
//     } else {
//         return false;
//     }
// }