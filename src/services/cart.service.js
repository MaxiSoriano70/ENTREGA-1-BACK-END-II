import { cartManager } from "../data/cart.mongo.js";

const addProductToCartService = async (product_id, user_id, quantity) => await cartManager.addProductToCart(product_id, user_id, quantity);

const readProductsFromUserService = async (user_id) => await cartManager.readProductsFromUser(user_id);

const updateQuantityService = async (id, quantity) => await cartManager.updateQuantity(id, quantity);

const updateStateService = async (id, state) => await cartManager.updateState(id, state);

const removeProductFromCartService = async (id) => await cartManager.removeProductFromCart(id);

export {addProductToCartService, readProductsFromUserService, updateQuantityService, updateStateService, removeProductFromCartService}