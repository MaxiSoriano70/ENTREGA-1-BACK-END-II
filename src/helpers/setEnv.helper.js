import { config } from "dotenv";
import args from "./setArgs.helper.js";

const { mode } = args;
const path = ".env" + (mode && "." + mode);

config({ path });

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;
const COOKIE_KEY = process.env.COOKIE_KEY;
const SESSION_KEY = process.env.SESSION_KEY;
const SECRETJWT = process.env.SECRETJWT;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOGGLE_SECRET = process.env.GOGGLE_SECRET;

const env = {
    PORT,
    MONGO_DB,
    COOKIE_KEY,
    SESSION_KEY,
    SECRETJWT,
    GOOGLE_ID,
    GOGGLE_SECRET,
};
export default env;
