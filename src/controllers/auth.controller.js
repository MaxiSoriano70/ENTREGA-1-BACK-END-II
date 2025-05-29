import { userManager } from "../data/dao.factory.js";

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

const verifyAccount = async (req, res) => {
    const { email, code } = req.params;
    const user = await userManager.readBy({ email, verifyCode: code});
    if (!user) return res.json401();
    await userManager.updateById(user._id, { isVerify: true });
    res.json200("VERIFIED");
}

export { register, login, online, signout, badAuth, google, me, verifyAccount};