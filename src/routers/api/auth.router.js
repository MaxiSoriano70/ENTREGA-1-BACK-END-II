import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";


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
        const response = req.user;
        const opts = { maxAge : 60*60*24*7, httpOnly: true };
        res.cookie("token", req.token, opts).status(200).json({
            response,
            method: req.method,
            url: req.originalUrl,
        });
    } catch (error) {
        next(error);
    }
}

const online = async (req, res, next) => {
    try {
        if (req.user && req.user._id) {
            res.status(200).json({
                user_id: req.user._id,
                method: req.method,
                url: req.url
            });
        } else {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

const signout = async (req, res, next) => {
    try {
        const message = "Signed out";
        res.clearCookie("token").status(200).json({
            message,
            method: req.method,
            url: req.url
        });
    } catch (error) {
        next(error);
    }
}

const badAuth = async (req, res, next) => {
    try {
        const error = new Error("Bad auth from redirect")
        error.statusCode = 401;
        throw error;
    } catch (error) {
        next(error);
    }
}

const google = async (req, res, next) => {
    try {
        const response = req.user;
        res.status(200).json({
            response,
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

authRouter.post("/register", passportCb("register") /*passport.authenticate("register", { session: false })*/, register);
authRouter.post("/login", passportCb("login") /*passport.authenticate("login", { session: false })*/, login);

authRouter.post("/online", passportCb("current") /*passport.authenticate("current", { session: false, failureRedirect: "/api/auth/bad-auth" })*/, online);
authRouter.post("/signout", passportCb("current") /*passport.authenticate("current", { session: false, failureRedirect: "/api/auth/bad-auth" })*/, signout);

authRouter.get("/bad-auth", badAuth);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"], failureRedirect: "/api/auth/bad-auth"}));
authRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/auth/bad-auth",}), google);

authRouter.get("/me", passportCb("current") /*passport.authenticate("current", { session: false, failureRedirect: "/api/auth/bad-auth" })*/, me);
export default authRouter;