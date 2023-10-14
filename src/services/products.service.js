import { productModel } from "../DAO/models/product.model.js";

class ProductService {
    validateProduct(product) {
        const { title, description, code, price, status, stock, category, thumbnail } = product
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
            console.log('validation error: please complete title, description, code, price, status, stock, category and thumbnail.');
            throw new Error('validation error: please complete title, description, code, price, status, stock, category and thumbnail.');
        } else {
            console.log('Product validated.');
        }
    }

    async getProducts(){
        const products = await productModel.find({});
        return products;
    }

    async getProductById(idProd){
        const product = await productModel.find({_id: idProd});
        return product;
    }

    async addProduct(newProduct){
        newProduct.status = true;
        this.validateProduct(newProduct);
        const productCreated = await productModel.create(newProduct);
        return productCreated;
    }

    async updateProduct(idProd, updateProduct){
        const productUptaded = await productModel.updateOne({ _id: idProd }, updateProduct);
        return productUptaded;
    }

    async deleteProduct(idProd){
        const deleted = await productModel.deleteOne({ _id: idProd });
        return deleted;
    }
}

export default ProductService;