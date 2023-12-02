import { Router } from "express";
import { isUser } from "../middlewares/auth.js";
import { productsController } from "../controllers/products.controller.js";

const productsHTMLRouter = Router();

// ENDPOINTS PRODUCTS WITH MONGODB

productsHTMLRouter.get("/", isUser, productsController.showProductsList);

export default productsHTMLRouter;