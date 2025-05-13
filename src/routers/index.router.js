import { Router } from "express";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/api", apiRouter);

export default router;