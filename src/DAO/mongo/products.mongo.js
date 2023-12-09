import { productsModel } from "./models/products.model.js";

class Products {
    async getProducts(){
        const products = await productsModel.find({});
        return products;
    }

    async getProductById(idProd){
        const product = await productsModel.findOne({_id: idProd});
        return product;
    }

    async addProduct(newProduct){
        const productCreated = await productsModel.create(newProduct);
        return productCreated;
    }

    async updateProduct(idProd, updateProduct){
        const productUptaded = await productsModel.updateOne({ _id: idProd }, updateProduct);
        return productUptaded;
    }

    async deleteProduct(idProd){
        const deleted = await productsModel.deleteOne({ _id: idProd });
        return deleted;
            
    }

    async showProductsList(filter, page, limit, sortOption) {
        const result = await productsModel.paginate(filter, {page: page || 1, limit: limit || 10, sort: sortOption, lean: true});
        return result;
    }
}

export default new Products();