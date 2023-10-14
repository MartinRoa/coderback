import { Router } from "express";
import productManager from "../DAO/ProductManager.js";

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

viewsRouter.get("/chat", async (req, res) => {
    return res.status(200).render("chat", {});
});

export default viewsRouter;