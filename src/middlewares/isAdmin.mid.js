import { userManager } from "../data/dao.factory.js";
import { verifyToken } from "../helpers/token.helpers.js";

/**
 * @isAdmin
 * evalúa la autorización necesaria
 * deja pasar sólo si el usuario es de role="admin"
 * en cualquier otra caso construye el error correspondiente
 */
const isAdmin = async (req, res, next) => {
    try {
        const headers = req?.headers?.authorization;
        if (!headers || !headers.startsWith("Bearer ")) {
            const error = new Error("Token is required!");
            error.statusCode = 403;
            throw error;
        }
        const token = headers.split(" ")[1];
        const data = verifyToken(token);
        if (data.role !== "ADMIN") {
            const error = new Error("Forbidden!");
            error.statusCode = 403;
            throw error;
        }
        const user = await userManager.readById(data.user_id);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default isAdmin;