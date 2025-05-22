import CustomRouter from "../custom.router.js";
import isUser from "../../middlewares/isUser.mid.js";
import { addProductToCart, readProductsFromUser, updateQuantity, updateState, removeProductFromCart } from "../../controllers/cart.controller.js";


class CartsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER"], addProductToCart);
        this.read("/", isUser, readProductsFromUser);
        this.update("/:id", ["USER"], updateQuantity);
        this.update("/:id/:state", ["USER"], updateState);
        this.destroy("/:id", ["USER"], removeProductFromCart);
        this.router.param("id", (req, res, next, id) => {
        try {
            if (!Types.ObjectId.isValid(id)) {
            res.json400();
            }
            next();
        } catch (error) {
            next(error);
        }
        });
    };
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();