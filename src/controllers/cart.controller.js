import { addProductToCartService, readProductsFromUserService, removeProductFromCartService, updateQuantityService, updateStateService } from "../services/cart.service.js";

const addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user._id;
    const one = await addProductToCartService(
        product_id,
        user_id,
        quantity
    );
    res.json201(one);
};

const readProductsFromUser = async (req, res) => {
    const user_id = req.user._id;
    console.log({ user_id });

    const all = await readProductsFromUserService(user_id);
    console.log({ all });
    if (all.length > 0) {
        return res.json200(all);
    }
    res.json404();
};

const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const one = await updateQuantityService(id, quantity);
    if (one) {
        return res.json200(one);
    }
    res.json404();
};

const updateState = async (req, res) => {
    const { id, state } = req.params;
    const states = ["reserved", "paid", "delivered"];
    if (states.includes(state)) {
        const one = await updateStateService(id, state);
        if (one) {
        return res.json200(one);
        }
        res.json404();
    }
    res.json400("Invalid state!");
};

const removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    const one = await removeProductFromCartService(id);
    if (one) {
        return res.json200(one);
    }
    res.json404();
};

export { addProductToCart, readProductsFromUser, updateQuantity, updateState, removeProductFromCart }