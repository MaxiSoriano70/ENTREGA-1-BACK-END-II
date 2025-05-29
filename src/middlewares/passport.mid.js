import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userManager } from "../data/dao.factory.js";
import { createHash, verifyHash } from "../helpers/hash.helpers.js";
import { createToken } from "../helpers/token.helpers.js";
import UserDTO from "../dto/users.dto.js";
const clientID = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let data = req.body;

            const user = await userManager.readBy({ email });
            if (user) {
                /*const error = new Error("Invalid credentials");
                error.status = 401;
                throw error;*/
                return done(null, null, { message: "Invalid credentials", statusCode: 401});
            }

            if (!data.avatar || data.avatar.trim() === "") {
                data.avatar = "https://cdn-icons-png.flaticon.com/512/18851/18851107.png";
            }

            data = new UserDTO(data);
            const response = await userManager.createOne(data);
            done(null, response);
            done(null, response);
        } catch (error) {
            done(error);
        }
    }
));

passport.use("login", new LocalStrategy(
    /* OBJETO DE LA CONFIGURACION DE LA ESTRATEGIA */
    { passReqToCallback: true, usernameField: "email"},
    /* CALLBACK DE LA ESTRATEGIA LOGICA DE AUTENTICACION/AUTORIZACION */
    async (req, email, password, done) => {
        try {
            /* Validar si existe el usuario */
            const response = await userManager.readBy({ email });
            if(!response){
                /*const error = new Error("Invalid credentials.");
                error.status = 401;
                throw error;*/
                return done(null, null, { message: "Invalid credentials email.", statusCode: 401});
            }
            /* Validar contraseña */
            if(!verifyHash(password, response.password)){
                /*const error = new Error("Invalid credencials");
                error.statusCode = 401;
                throw error;*/
                return done(null, null, { message: "Invalid credentials pass.", statusCode: 401});
            }
            /* Lo dejamos temporalmente porqeu despues vamos a utilizar JWT */
            /*req.session.user_id = response._id;
            req.session.email = email;
            req.session.role = response.role;*/

            /* CREAMOS EL TOKEN Y LO AGREGAMOS AL REQUERIMIENTO*/
            const data = {
                user_id: response._id,
                email: response.email,
                role: response.role
            }
            const token = createToken(data);
            req.token = token;
            done(null, response);
        } catch (error) {
            done(error)
        }
    }
));

passport.use("google", new GoogleStrategy(
        { clientID, clientSecret, callbackURL },
        async (accessToken, resfreshToken, profile, done) => {
            try {
                const email = profile.id;
                let user = await userManager.readBy({ email });
                if(!user){
                    user = {
                        name: profile.name.givenName,
                        avatar: profile.picture,
                        email: profile.id,
                        password: createHash(profile.id),
                        city: "Google"
                    };
                    user = await userManager.createOne(user);
                }
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

/* MIDDLEWARE PARA VERIFICAR QUE EL USUARIO ES PARTE DE NUESTRA APP*/
/* NOMBRE DE LA ESTRATEGIA Y SU CONSTRUCTOR*/
passport.use("current", new JwtStrategy(
    /* Objeto de configuracion de la estrategia */
    { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: process.env.SECRETJWT },
    /* Callback con la logica de la estrategia */
    async(data, done) => {
        try {
            const { user_id } = data;
            const user = await userManager.readById(user_id);
            if(!user){
                /*const error = new Error("Bad auth");
                error.statusCode = 401;
                throw error;*/
                return done(null, null, { message: "Bad auth.", statusCode: 401});
            }
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
));

passport.use("admin", new JwtStrategy(
    /* Objeto de configuracion de la estrategia */
    { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: process.env.SECRETJWT },
    /* Callback con la logica de la estrategia */
    async (data, done) =>{
        try {
            const { user_id} = data;
            const user = await userManager.readById(user_id);
            if(!user){
                /*const error = new Error("Bad auth");
                error.statusCode = 401;
                throw error;*/
                return done(null, null, { message: "Bad auth.", statusCode: 401});
            }
            if(user.role !== "ADMIN"){
                /*const error = new Error("Forbidden");
                error.statusCode = 403;
                throw error;*/
                return done(null, null, { message: "Forbidden.", statusCode: 403});
            }
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
));

export default passport;