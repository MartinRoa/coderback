import { Router } from "express";
import productsHTMLRouter from "./products.html.router.js";
import cartHTMLRouter from "./cart.html.router.js";
import authHTMLRouter from "./auth.html.router.js";

const viewsRouter = Router();

// ENDPOINTS VIEWS WITH MONGO DB

viewsRouter.use("/products", productsHTMLRouter);
viewsRouter.use("/cart", cartHTMLRouter);
viewsRouter.use("/auth", authHTMLRouter);

viewsRouter.get("/", async (req, res) => {
    return res.redirect('/auth/login');
});

export default viewsRouter;

// ENDPOINTS VIEWS WITH FILE SYSTEM

// import productManager from "../DAO/ProductManager.js";

// viewsRouter.get("/", async (req, res) => {
//     const products = await productManager.getProducts();
//     res.render("home", {products});
// });

// viewsRouter.get("/realtimeproducts", async (req, res) => {
//     const products = await productManager.getProducts();
//     return res.status(200).render("realTimeProducts", {products});
// });

// viewsRouter.get("/chat", async (req, res) => {
//     return res.status(200).render("chat", {});
// });