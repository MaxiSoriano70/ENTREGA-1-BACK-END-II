import CustomRouter from "../custom.router.js";
import { cartManager } from "../../data/cart.mongo.js";
import isUser from "../../middlewares/isUser.mid.js";

const addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user._id;
    const one = await cartManager.addProductToCart(
        product_id,
        user_id,
        quantity
    );
    res.json201(one);
};

const readProductsFromUser = async (req, res) => {
    const user_id = req.user._id;
    console.log({ user_id });

    const all = await cartManager.readProductsFromUser(user_id);
    console.log({ all });
    if (all.length > 0) {
        return res.json200(all);
    }
    res.json404();
};

const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const one = await cartManager.updateQuantity(id, quantity);
    if (one) {
        return res.json200(one);
    }
    res.json404();
};

const updateState = async (req, res) => {
    const { id, state } = req.params;
    const states = ["reserved", "paid", "delivered"];
    if (states.includes(state)) {
        const one = await cartManager.updateState(id, state);
        if (one) {
        return res.json200(one);
        }
        res.json404();
    }
    res.json400("Invalid state!");
};

const removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    const one = await cartManager.removeProductFromCart(id);
    if (one) {
        return res.json200(one);
    }
    res.json404();
};
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