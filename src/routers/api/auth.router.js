import CustomRouter from "../custom.router.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, online, signout, badAuth, google, me} from "../../controllers/auth.controller.js"
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