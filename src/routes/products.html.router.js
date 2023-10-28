import { Router } from "express";
import { productModel } from "../DAO/models/product.model.js";
import { isUser } from "../middlewares/auth.js";

const productsHTMLRouter = Router();

// ENDPOINTS PRODUCTS WITH MONGODB

productsHTMLRouter.get("/", isUser, async (req, res) => {
    try {
        const { limit, page, category, status, sort } = req.query;

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

        const result = await productModel.paginate(filter, {page: page || 1, limit: limit || 10, sort: sortOption, lean: true});
      
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
            userName: req.session.firstName,
            isAdmin: req.session.isAdmin
        };

        return res.status(200).render("products", {finalData});
    } 
    catch {
        return res.status(409).json({
            status: "error",
            message: "Could not get the product list.",
        });
    }
});

export default productsHTMLRouter;