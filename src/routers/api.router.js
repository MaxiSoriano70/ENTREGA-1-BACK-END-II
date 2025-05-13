import { Router } from "express";
import authRouter from "./api/auth.router.js";
import cartRouter from "./api/cart.router.js";
import productsRouter from "./api/products.router.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartRouter);
apiRouter.use("/products", productsRouter);

export default apiRouter;