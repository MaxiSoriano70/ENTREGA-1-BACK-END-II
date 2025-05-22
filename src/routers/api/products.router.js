import CustomRouter from "../custom.router.js";
import { createOne, readAll, readById, updateById, destroyById, pidParam } from "../../controllers/products.controller.js";

class ProductRouter extends CustomRouter {
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.create("/", ["ADMIN"], createOne);
        this.read("/", ["PUBLIC"], readAll);
        this.read("/:pid", ["PUBLIC"], readById);
        this.update("/:pid", ["ADMIN"] , updateById);
        this.destroy("/:pid", ["ADMIN"] , destroyById);
        this.router.param("pid", pidParam);
    }
}

const productRouter = new ProductRouter();

export default productRouter.getRouter();