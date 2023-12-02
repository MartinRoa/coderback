import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const cartHTMLRouter = Router();

// ENDPOINTS CARTS WITH MONGODB

cartHTMLRouter.get("/:cid", cartsController.showCartById);

export default cartHTMLRouter;