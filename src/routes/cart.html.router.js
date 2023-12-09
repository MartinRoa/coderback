import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { isActiveSession, isUser } from "../middlewares/auth.js";

const cartHTMLRouter = Router();

// ENDPOINTS CARTS HTML

cartHTMLRouter.get("/:cid", isActiveSession, cartsController.showCartById);
cartHTMLRouter.get("/:cid/purchase", isUser, cartsController.finalizePurchase);

export default cartHTMLRouter;