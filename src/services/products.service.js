import {
    createOneRep,
    readAllRep,
    readByIdRep,
    updateByIdRep,
    destroyByIdRep,
} from "../repositories/products.rep.js";

const createOneService = async (data) => await createOneRep(data);
const readAllService = async (filter) => await readAllRep(filter);
const readByIdService = async (pid) => await readByIdRep(pid);
const updateByIdService = async (pid) => await updateByIdRep(pid, data);
const destroyByIdService = async (pid) => await destroyByIdRep(pid);

export {
    createOneService,
    readAllService,
    readByIdService,
    updateByIdService,
    destroyByIdService,
};