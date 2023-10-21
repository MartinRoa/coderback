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
        if (!products) {
            throw new Error("List of products cannot be showed.");
        }
        return products;
    }

    async getProductById(idProd){
        const product = await productModel.findOne({_id: idProd});
        if (!product) {
            throw new Error('Product not found.');
        }
        return product;
    }

    async addProduct(newProduct){
        newProduct.status = true;
        this.validateProduct(newProduct);
        const productCreated = await productModel.create(newProduct);
        if (!productCreated) {
            throw new Error("The entered product already exists, or the information provided is incomplete.");
        }
        return productCreated;
    }

    async updateProduct(idProd, updateProduct){
        const productUptaded = await productModel.updateOne({ _id: idProd }, updateProduct);

        if (productUptaded) {
            if(productUptaded.modifiedCount === 0){
                throw new Error('Product not found or invalid information.');
            }
            return productUptaded;
        } else {
            throw new Error("Product not found or invalid information.");
        }
    }

    async deleteProduct(idProd){
        const deleted = await productModel.deleteOne({ _id: idProd });
        if (deleted) {
            if(deleted.deletedCount === 0){
                throw new Error('Product not exist.');
            } else {
                return deleted;
            }
        } else {
            throw new Error("Product not found.");
        }
    }
}

export default ProductService;