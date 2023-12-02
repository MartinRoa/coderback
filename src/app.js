import express from "express";
import handlebars from "express-handlebars";
import apiRouter from "./routes/api.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname, connectMongoDB } from "./utils.js";
import { initializeSocket } from "./socket/socketServer.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import { MONGODB_URL, PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
});

connectMongoDB();
initializeSocket(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
    session({
      store: MongoStore.create({ mongoUrl: MONGODB_URL, ttl: 7200 }),
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

