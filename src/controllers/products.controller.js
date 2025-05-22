import { productManager } from "../data/manager.mongo.js";
import passportCb from "../middlewares/passportCb.mid.js";
import { Types } from "mongoose";
import { createOneService, readAllService, readByIdService, updateByIdService } from "../services/products.service.js";

const createOne = async (req, res) => {
    const data = req.body;
    const response = await createOneService(data);
    res.json201(response);
};

const readAll = async (req, res) => {
    const filter = req.query;
    const response = await readAllService(filter);
    if (response.length === 0) {
        res.json404();
    }
    res.json200(response);
};

const readById = async (req, res) => {
    const { pid } = req.params;
    const response = await readByIdService(pid);
    if (!response) {
        res.json404();
    }
    res.json200(response);
};

const updateById = async (req, res) => {
    const { pid } = req.params;
    const data = req.body;
    const response = await updateByIdService(pid, data);
    if (!response) {
        res.json404();
    }
    await productManager.updateById(pid, data);
    res.json200(response);
};

const destroyById = async (req, res) => {
    const { pid } = req.params;
    const response = await destroyByIdService(pid);
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

export { createOne, readAll, readById, updateById, destroyById, pidParam }