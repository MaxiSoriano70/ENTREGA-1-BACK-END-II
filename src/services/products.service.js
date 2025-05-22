import { productManager } from "../data/manager.mongo.js";

const createOneService = async (data) => await productManager.createOne(data);

const readAllService = async (filter) => await productManager.readAll(filter);

const readByIdService = async (pid) => await productManager.readById(pid);

const updateByIdService = async (pid, data) => await productManager.updateById(pid, data);

const destroyByIdService = async (pid) => await productManager.destroyById(pid);

export { createOneService, readAllService, readByIdService, updateByIdService, destroyByIdService }