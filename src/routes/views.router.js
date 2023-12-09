import { Router } from "express";
import productsHTMLRouter from "./products.html.router.js";
import cartHTMLRouter from "./cart.html.router.js";
import authHTMLRouter from "./auth.html.router.js";
import { isUser } from "../middlewares/auth.js";

const viewsRouter = Router();

// ENDPOINTS VIEWS

viewsRouter.use("/products", productsHTMLRouter);
viewsRouter.use("/cart", cartHTMLRouter);
viewsRouter.use("/auth", authHTMLRouter);

viewsRouter.get("/chat", isUser, async (req, res) => {
    return res.status(200).render("chat", {});
});

viewsRouter.get("/", async (req, res) => {
    return res.redirect('/auth/login');
});

export default viewsRouter;