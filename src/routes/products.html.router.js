import { Router } from "express";
import { isActiveSession } from "../middlewares/auth.js";
import { productsController } from "../controllers/products.controller.js";

const productsHTMLRouter = Router();

// ENDPOINTS PRODUCTS HTML

productsHTMLRouter.get("/", isActiveSession, productsController.showProductsList);

export default productsHTMLRouter;