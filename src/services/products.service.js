import { Products } from "../DAO/factory.js";
import { logger } from "../utils.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { generateProductErrorInfo } from "./errors/info.js";

class ProductsService {
    constructor(dao) {
        this.dao = dao;
    }

    // validateProduct(product) {
    //     const { title, description, code, price, status, stock, category, thumbnail } = product
    //     if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
    //         console.log('validation error: please complete title, description, code, price, status, stock, category and thumbnail.');
    //         throw new Error('validation error: please complete title, description, code, price, status, stock, category and thumbnail.');
    //     } else {
    //         console.log('Product validated.');
    //     }
    // }

    async getProducts(){
        const products = await this.dao.getProducts();
        if (!products) {
            logger.error("List of products cannot be showed.");
            throw new Error("List of products cannot be showed.");
        }
        return products;
    }

    async getProductById(idProd){
        const product = await this.dao.getProductById(idProd);
        if (!product) {
            logger.error('Product not found.');
            throw new Error('Product not found.');
        }
        return product;
    }

    async addProduct(newProduct){
        newProduct.status = true;
        // this.validateProduct(newProduct);
        
        const { title, description, code, price, stock, category, thumbnail } = newProduct
        if (!title || !description || !code || !price || !stock || !category || !thumbnail) {
            logger.error("Product creation error");
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo(newProduct),
                message: "Create a new product error. Check all the necessary properties and try again.",
                code: EErrors.NEW_PRODUCT_DATA_INCOMPLETE
            });
        };

        const productCreated = await this.dao.addProduct(newProduct);
        if (!productCreated) {
            logger.error("The entered product already exists, or the information provided is incomplete.");
            throw new Error("The entered product already exists, or the information provided is incomplete.");
        }
        return productCreated;
    }

    async updateProduct(idProd, updateProduct){
        const productUptaded = await this.dao.updateProduct(idProd , updateProduct);

        if (productUptaded) {
            if(productUptaded.modifiedCount === 0){
                logger.error("Product not found or invalid information.");
                throw new Error("Product not found or invalid information.");
            }
            return productUptaded;
        } else {
            logger.error("Product not found or invalid information.");
            throw new Error("Product not found or invalid information.");
        }
    }

    async deleteProduct(idProd){
        const deleted = await this.dao.deleteProduct(idProd);
        if (deleted) {
            if(deleted.deletedCount === 0){
                logger.error('Product not exist.');
                throw new Error('Product not exist.');
            } else {
                return deleted;
            }
        } else {
            logger.error("Product not found.");
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
    
        const result = await this.dao.showProductsList(filter, page, limit, sortOption);
          
        if(isNaN(result.page) || page <= 0){
            logger.error("Invalid page number.");
            return res.status(409).json({
                status: "error",
                message: "Invalid page number.",
            });
        } else if(result.page > result.totalPages) {
            logger.error("Page number exceeds total pages.");
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
            isAdmin: req.session.user.isAdmin,
            cart: req.session.user.cart
        };
        return finalData;
    }
}

export const productsService = new ProductsService(Products);