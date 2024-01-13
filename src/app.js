import express from "express";
import handlebars from "express-handlebars";
import apiRouter from "./routes/api.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname, generateMockingProducts, logger } from "./utils.js";
import { initializeSocket } from "./socket/socketServer.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import config from "./config.js";
import cors from 'cors';
import errorHandler from './middlewares/error.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación del ecommerce",
            description: "Proyecto de prueba de ecommerce. Backend - Coderhouse",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
    cors({
      origin: "http://localhost:8080/",
      methods: ["GET", "POST", "PUT"],
    })
);

const httpServer = app.listen(config.port, () => {
    logger.info(`App listening on port http://localhost:${config.port}`);
});

initializeSocket(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
    session({
      store: MongoStore.create({ mongoUrl: config.mongodbURL, ttl: 7200 }),
      secret: '...',
      resave: true,
      saveUninitialized: true,
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// API REST WITH JSON
app.use("/api", apiRouter);
// HTML RENDER SERVER SIDE
app.use("/", viewsRouter);
// MOCKING ENDPOINT
app.get("/mockingproducts", async (req, res) => {
    const products = generateMockingProducts(100);
    res.send({ status: "success", payload: products });
});
// ERROR MIDDLEWARE
app.use(errorHandler);
// LOGGER TEST
app.get("/loggerTest", async (req, res) => {
    logger.debug("Test logger de debug");
    logger.http("Test logger de http");
    logger.info("Test logger de info");
    logger.warning("Test logger de warning");
    logger.error("Test logger de error1");
    logger.fatal("Test logger de fatal1");
    res.json({message: "Logger Test"})
});

app.get("*", async (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found.",
        data: {}
    })
});

