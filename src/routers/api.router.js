import { fork } from "child_process";
import CustomRouter from "./custom.router.js";
import authRouter from "./api/auth.router.js";
import cartRouter from "./api/cart.router.js";
import productsRouter from "./api/products.router.js";
import sum from "../helpers/sum.helper.js";

const sumCb = (req, res) => {
    const result = sum();
    return res.json200(result);
};

const sumProcessCb = (req, res) => {
    /* ESTO FUNCIONA SI --WATCH */
    /* CREA UN SUBPROCESO */
    const childProcess = fork("./src/helpers/sumProcess.helper.js");
    /* SE INICIA EL SUBPROCESO */
    childProcess.send("start");
    /* RESPONDO */
    childProcess.on("message", result => res.json200(result));
};

class ApiRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.use("/auth", authRouter);
        this.use("/carts", cartRouter);
        this.use("/products", productsRouter);
        this.read("/sum", ["PUBLIC"], sumCb)
        this.read("/sum-process", ["PUBLIC"], sumProcessCb)
    }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();