import { productsModel } from "../DAO/models/products.model.js";

class ProductsService {
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
        const products = await productsModel.find({});
        if (!products) {
            throw new Error("List of products cannot be showed.");
        }
        return products;
    }

    async getProductById(idProd){
        const product = await productsModel.findOne({_id: idProd});
        if (!product) {
            throw new Error('Product not found.');
        }
        return product;
    }

    async addProduct(newProduct){
        newProduct.status = true;
        this.validateProduct(newProduct);
        const productCreated = await productsModel.create(newProduct);
        if (!productCreated) {
            throw new Error("The entered product already exists, or the information provided is incomplete.");
        }
        return productCreated;
    }

    async updateProduct(idProd, updateProduct){
        const productUptaded = await productsModel.updateOne({ _id: idProd }, updateProduct);

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
        const deleted = await productsModel.deleteOne({ _id: idProd });
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

    async showProductsList(req, res, limit, page, category, status, sort ) {
        const filter = {};
        if (category) {
        filter.category = category;
        }
        if (status) {
        filter.status = status;
        }
    
        let sortOption = {};
        if (sort === 'asc') {
            sortOption = { price: 1 };
        } else if (sort === 'desc') {
            sortOption = { price: -1 };
        }
    
        const result = await productsModel.paginate(filter, {page: page || 1, limit: limit || 10, sort: sortOption, lean: true});
          
        if(isNaN(result.page) || page <= 0){
            return res.status(409).json({
                status: "error",
                message: "Invalid page number.",
            });
        } else if(result.page > result.totalPages) {
            return res.status(409).json({
                status: "error",
                message: "Page number exceeds total pages.",
            });
        }
        
        const queryString = `&limit=${result.limit}&category=${encodeURIComponent(category || '')}&status=${status || ''}&sort=${sort || ''}`;
        const prevLinkURL = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage + queryString}` : null;
        const nextLinkURL = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage + queryString}` : null;
        
        const finalData = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: prevLinkURL,
            nextLink: nextLinkURL,
            userName: req.session.user.firstName,
            isAdmin: req.session.user.isAdmin
        };
        return finalData;
    }
}

export const productsService = new ProductsService();