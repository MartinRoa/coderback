import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { isUser } from "../middlewares/auth.js";

const cartsRouter = Router();

// ENDPOINTS CARTS

cartsRouter.post("/", cartsController.createNewCart);

cartsRouter.get("/:cid", cartsController.getCartById);

cartsRouter.post("/:cid/products/:pid", isUser, cartsController.addProductToCart);

cartsRouter.delete("/:cid/products/:pid", cartsController.deleteProductToCart);

cartsRouter.delete("/:cid", cartsController.emptyCart);

cartsRouter.put("/:cid/products/:pid", cartsController.updateProductQty);

cartsRouter.put("/:cid", cartsController.updateAllCart);

export default cartsRouter;
