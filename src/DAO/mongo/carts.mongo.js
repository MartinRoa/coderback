import { cartsModel } from "./models/carts.model.js";

class Carts {
    async newCart() {
        const cartCreated = await cartsModel.create({products: []});
        return cartCreated;
    }

    async getCartById(idCart) {
        const cart = await cartsModel.findOne({_id: idCart});
        return cart;
    }

    async updateCart(idCart, updateCart){
        const cartUptaded = await cartsModel.updateOne({ _id: idCart }, updateCart);
        return cartUptaded;
    }

    async deleteCart(idCart) {
        const cartDeleted = await cartsModel.deleteOne({_id: idCart});
        return cartDeleted;
    }

    async deleteProductToCart(cid, pid) {
        const cartUpdated = await cartsModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } }});
        return cartUpdated;
    }

    async emptyCart(cid) {
        const cartUpdated = await cartsModel.updateOne({ _id: cid }, { $set: { products: [] } });
        return cartUpdated;    
    }

    async updateProductQty(cid, pid, newQty) {
        const cartUpdated = await cartsModel.updateOne({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": newQty } });
        return cartUpdated;
    }
}

export default new Carts();