import express from "express";
import handlebars from "express-handlebars";
import apiRouter from "./routes/api.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { initializeSocket } from "./socket/socketServer.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import config from "./config.js";
import cors from 'cors';

const app = express();

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
    console.log(`Example app listening on port http://localhost:${config.port}`)
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


app.get("*", async (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found.",
        data: {}
    })
});

