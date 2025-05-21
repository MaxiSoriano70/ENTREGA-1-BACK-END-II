import CustomRouter from "../custom.router.js";
import { productManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { Types } from "mongoose";

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

const createOne = async (req, res) => {
    const data = req.body;
    const response = await productManager.createOne(data);
    res.json201(response);
};

const readAll = async (req, res) => {
    const filter = req.query;
    const response = await productManager.readAll(filter);
    if (response.length === 0) {
        res.json404();
    }
    res.json200(response);
};

const readById = async (req, res) => {
    const { pid } = req.params;
    const response = await productManager.readById(pid);
    if (!response) {
        res.json404();
    }
    res.json200(response);
};

const updateById = async (req, res) => {
    const { pid } = req.params;
    const data = req.body;
    const response = await productManager.readById(pid);
    if (!response) {
        res.json404();
    }
    await productManager.updateById(pid, data);
    res.json200(response);
};

const destroyById = async (req, res) => {
    const { pid } = req.params;
    const response = await productManager.destroyById(pid);
    if (!response) {
        res.json404();
    }
    res.json200(response);
};

const pidParam = (req, res, next, pid) => {
    try {
        const isObjectId = Types.ObjectId.isValid(pid);
        if(isObjectId){
            return next();
        }
        else{
            res.json400();
        }
    } catch (error) {
        next(error);
    }
}

const productRouter = new ProductRouter();

export default productRouter.getRouter();