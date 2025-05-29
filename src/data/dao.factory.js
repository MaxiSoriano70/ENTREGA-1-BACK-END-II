import DatabaseConnect from "../helpers/dbConnect.helper.js";

const { PERSISTENCE } = process.env;

let dao = {};
// el patron factory se va a encargar de "fabricar" el data access object
// con el dao correspondiente a la persistencia de la variable PERSISTENCE

switch (PERSISTENCE) {
    case "memory":
        // si se sellecciona memory tengo que usar los gestores de memory
        break;
    case "fs":
        // si se sellecciona fs tengo que usar los gestores de fs
        {
            console.log("fs database connected");
            const { productManager, userManager } = await import(
                "./fs/manager.fs.js"
            );
            const { cartManager } = await import("./fs/carts.fs.js");
            dao = { productManager, userManager, cartManager };
            console.log("conectado a fs");
        }
        break;
    default:
        // pro defecto tengo que usar los gestores de mongo
        {
            const connect = new DatabaseConnect(process.env.MONGO_DB);
            const connect1 = new DatabaseConnect(process.env.MONGO_DB);
            const connect2 = new DatabaseConnect(process.env.MONGO_DB);
            const connect3 = new DatabaseConnect(process.env.MONGO_DB);
            const connect4 = new DatabaseConnect(process.env.MONGO_DB);
            connect.dbConnect(process.env.MONGO_DB);
            const { productManager, userManager } = await import(
                "./manager.mongo.js"
            );
            const { cartManager } = await import("./cart.mongo.js");
            dao = { productManager, userManager, cartManager };
            console.log("conectado a mongo");
        }
        break;
}

const { productManager, userManager, cartManager } = dao;
export { productManager, userManager, cartManager };
export default dao;