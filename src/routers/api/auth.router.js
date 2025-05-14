import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import isUser from "../../middlewares/isUser.mid.js";

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

const login = (req, res, next) => {
    try {
        res.status(200).json({
            response: req.token,
            method: req.method,
            url: req.originalUrl,
        });
    } catch (error) {
        next(error);
    }
}

const me = (req, res, next) => {
    try {
        res.status(200).json({
            response: {
                nickname: req.user.nickname,
                avatar: req.user.avatar,
                email: req.user.email
            },
            method: req.method,
            url: req.originalUrl,
        });
    } catch (error) {
        next(error);
    }
}

authRouter.post("/register", passport.authenticate("register", { session: false }), register);
authRouter.post("/login", passport.authenticate("login", { session: false }), login);
authRouter.get("/me", isUser, me)
export default authRouter;