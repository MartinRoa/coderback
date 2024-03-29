import express from "express";
import cartsRouter from "./carts.router.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import usersRouter from "./users.router.js";

const apiRouter = express.Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use('/sessions', sessionsRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;