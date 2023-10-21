import { Router } from "express";
import productManager from "../DAO/ProductManager.js";
import productsHTMLRouter from "./products.html.router.js";
import cartHTMLRouter from "./cart.html.router.js";

const viewsRouter = Router();

// ENDPOINTS VIEWS WITH MONGO DB

viewsRouter.use("/products", productsHTMLRouter);
viewsRouter.use("/cart", cartHTMLRouter);

// ENDPOINTS VIEWS WITH FILE SYSTEM

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