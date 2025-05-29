import { productManager } from "../data/dao.factory.js";
import ProductDTO from "../dto/products.dto.js";

const createOneRep = async (data) => {
    data = new ProductDTO(data)
    const createProduct = await productManager.createOne(data);
    return createProduct;
}
const readAllRep = async (filter) => await productManager.readAll(filter);
const readByIdRep = async (pid) => await productManager.readById(pid);
const updateByIdRep = async (pid) => await productManager.updateById(pid, data);
const destroyByIdRep = async (pid) => await productManager.destroyById(pid);

export {
    createOneRep,
    readAllRep,
    readByIdRep,
    updateByIdRep,
    destroyByIdRep,
};