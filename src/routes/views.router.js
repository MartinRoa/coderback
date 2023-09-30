import { Router } from "express";
import productManager from "../services/ProductManager.js";

const viewsRouter = Router();

// ENDPOINTS VIEWS

viewsRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    return res.status(200).render("realTimeProducts", {products});
});

export default viewsRouter;