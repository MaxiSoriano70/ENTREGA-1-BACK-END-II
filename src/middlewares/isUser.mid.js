import { userManager } from "../data/manager.mongo.js";
import { verifyToken } from "../helpers/token.helpers.js";

const isUser = async (req, res, next) => {
    try {
        const headers = req?.headers?.authorization;
        if (!headers || !headers.startsWith("Bearer ")) {
            const error = new Error("Token requerido");
            error.statusCode = 403;
            throw error;
        }

        const token = headers.split(" ")[1];
        const data = verifyToken(token);
        const user = await userManager.readById(data.user_id);

        if (!user) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};


export default isUser;