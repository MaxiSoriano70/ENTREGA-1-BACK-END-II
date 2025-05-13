import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const register = (req, res, next) => {
    try {
        res.status(201).json({
            response: req.user._id,
            method: req.method,
            url: req.originalUrl,
        });
    } catch (error) {
        next(error);
    }
}

authRouter.post("/register", passport.authenticate("register", { session: false }), register);
export default authRouter;