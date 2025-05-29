import CustomRouter from "./custom.router.js";
import authRouter from "./api/auth.router.js";
import cartRouter from "./api/cart.router.js";
import productsRouter from "./api/products.router.js";
import { sumCb, sumProcessCb, sendEmailCb } from "../controllers/api.controller.js";

class ApiRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.use("/auth", authRouter);
        this.use("/carts", cartRouter);
        this.use("/products", productsRouter);
        this.read("/sum", ["PUBLIC"], sumCb);
        this.read("/sum-process", ["PUBLIC"], sumProcessCb);
        this.read("/send/:email", ["PUBLIC"], sendEmailCb);
    }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();