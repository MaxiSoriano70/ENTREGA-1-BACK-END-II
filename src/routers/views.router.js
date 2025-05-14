import { Router } from "express";
import isUser from "../middlewares/isUser.mid.js";

const viewsRouter = Router();

const indexView = ( req, res ) => {
    try {
        res.status(200).render("index");
    } catch (error) {
        res.status(500).render("error");
    }
}

const registerView = ( req, res ) => {
    try {
        res.status(200).render("register");
    } catch (error) {
        res.status(500).render("error");
    }
}

const loginView = ( req, res ) => {
    try {
        res.status(200).render("login");
    } catch (error) {
        res.status(500).render("error");
    }
}

const meView = ( req, res ) => {
    try {
        res.status(200).render("profile");
    } catch (error) {
        res.status(500).render("error");
    }
}

viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login", loginView);
viewsRouter.get("/me", meView)

export default viewsRouter;