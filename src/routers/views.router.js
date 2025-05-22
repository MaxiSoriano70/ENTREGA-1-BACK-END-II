import { Router } from "express";
import { indexView, profileView, detailsView, cartView, registerView, loginView } from "../controllers/views.controller.js"

const viewsRouter = Router();

viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login", loginView);
viewsRouter.get("/me", profileView)

export default viewsRouter;