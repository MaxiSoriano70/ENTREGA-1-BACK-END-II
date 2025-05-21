import CustomRouter from "../custom.router.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const register = (req, res) => {
    res.json201({user : req.user._id}, "Registered");
}

const login = (req, res) => {
    const response = req.user;
    const opts = { maxAge : 60*60*24*7, httpOnly: true };
    res.cookie("token", req.token, opts).json200(response, "Logged in");
}

const online = async (req, res) => {
    if (req.user && req.user.user_id) {
        res.json200({user: req.user});
    } else {
        res.json401("Invalid credentials");
    }
}

const signout = async (req, res) => {
    const message = "Signed out";
    res.clearCookie("token").json200(null, message);
}

const badAuth = async (req, res) => {
    const error = new Error("Bad auth from redirect")
    res.json401(error);
}

const google = async (req, res) => {
    const response = req.user;
    res.json200(response);
}

const me = (req, res) => {
    res.json200({
        nickname: req.user.nickname,
        avatar: req.user.avatar,
        email: req.user.email
    });
}

class AuthRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.create("/register", ["PUBLIC"], passportCb("register"), register);
        this.create("/login", ["PUBLIC"], passportCb("login"), login);

        this.create("/online", ["USER", "ADMIN"], online);
        this.create("/signout", ["USER", "ADMIN"], signout);

        this.read("/bad-auth", ["PUBLIC"], badAuth);
        this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"], failureRedirect: "/api/auth/bad-auth"}));
        this.read("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/auth/bad-auth",}), google);

        this.read("/me", ["USER", "ADMIN"], me);
    }
}

/*authRouter.post("/register", passportCb("register"), register);
authRouter.post("/login", passportCb("login"), login);

authRouter.post("/online", passportCb("current"), online);
authRouter.post("/signout", passportCb("current"), signout);

authRouter.get("/bad-auth", badAuth);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"], failureRedirect: "/api/auth/bad-auth"}));
authRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/auth/bad-auth",}), google);

authRouter.get("/me", passportCb("current"), me);*/

const authRouter = new AuthRouter();

export default authRouter.getRouter();