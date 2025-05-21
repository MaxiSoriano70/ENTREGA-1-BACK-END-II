import Manager from "./manager.mongo.js";
import Cart from "./models/cart.model.js";

class CartManager extends Manager {
    constructor() {
        super(Cart);
    }
    addProductToCart = async (product_id, user_id, quantity) => await this.createOne({ product_id, user_id, quantity });
    readProductsFromUser = async (user_id) => await this.readAll({ user_id, state: "reserved" });
    updateQuantity = async (cart_id, quantity) => await this.updateById(cart_id, { quantity });
    updateState = async (cart_id, state) => await this.updateById(cart_id, { state });
    removeProductFromCart = async (cart_id) => await this.destroyById(cart_id);
}

const cartManager = new CartManager();
export { cartManager };