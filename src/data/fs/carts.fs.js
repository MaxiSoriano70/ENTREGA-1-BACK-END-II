import FileManager from "./manager.fs.js";

class CartsManager extends FileManager {
    constructor() {
        super("./src/data/fs/data/carts.json");
    }

    addProductToCart = async (product_id, user_id, quantity) => {
        return await this.createOne({
        _id: crypto.randomBytes(12).toString("hex"),
        product_id,
        user_id,
        quantity,
        state: "reserved",
        });
    };
    readProductsFromUser = async (user_id) => await this.readAll({ user_id, state: "reserved" });
    updateQuantity = async (cart_id, quantity) => await this.updateById(cart_id, { quantity });
    updateState = async (cart_id, state) => await this.updateById(cart_id, { state });
    removeProductFromCart = async (cart_id) => await this.destroyById(cart_id);
}

const cartManager = new CartsManager();
export { cartManager };
