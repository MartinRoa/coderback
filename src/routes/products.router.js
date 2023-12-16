import { Router } from "express";
import { uploader } from "../utils.js";
import { productsController } from "../controllers/products.controller.js";
import { isAdmin } from "../middlewares/auth.js";

const productsRouter = Router();

// ENDPOINTS PRODUCTS

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/:pid", productsController.getProductById);

productsRouter.post("/", uploader.single("thumbnail"), productsController.addProduct);

productsRouter.put("/:pid", isAdmin, productsController.updateProduct);

productsRouter.delete("/:pid", isAdmin, productsController.deleteProduct);

export default productsRouter;