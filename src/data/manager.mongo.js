import User from "./models/user.model.js";
import Product from "./models/product.model.js";
/*import Cart from "./models/cart.model.js";*/

class Manager{
    constructor(model){
        this.model = model;
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readBy = async (data) => await this.model.findOne(data).lean();
    readById = async (id) => await this.model.findOne({ _id: id}).lean();
    updateById = async (id, data) => await this.model.findByIdAndUpdate({ _id: id}, data, { new: true});
    destroyById = async (id) => await this.model.findByIdAndDelete({ _id: id});
}

export default Manager;

const userManager = new Manager(User);
const productManager = new Manager(Product);
/*const cartManager = new Manager(Cart);*/

export { userManager, productManager, /*cartManager*/};