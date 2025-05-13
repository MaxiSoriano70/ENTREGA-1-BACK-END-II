import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";

/* SERVER SETTINGS */
const server = express();
const port = process.env.PORT;
const ready = () => {
    console.log("Server: http://localhost:" + port);
    dbConnect(process.env.MONGO_DB);
};
server.listen(port, ready);

/* ENGINE SETTINGS */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* MIDDLEWARES SETTINGS */
server.use(morgan("dev"));
server.use(cookieParser(process.env.COOKIE_KEY));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/* ROUTER SETTINGS */
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);