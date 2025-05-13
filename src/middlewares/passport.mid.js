import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { userManager } from "../data/manager.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helpers.js";
import { createToken } from "../helpers/token.helpers.js";
const clientID = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use("register", new LocalStrategy(
    /* OBJETO DE LA CONFIGURACION DE LA ESTRATEGIA */
    { passReqToCallback: true, usernameField: "email"},
    /* CALLBACK DE LA ESTRATEGIA LOGICA DE AUTENTICACION/AUTORIZACION */
    async (req, email, password, done) => {
        try {
            /**
             * La logica del register esta actualmente en la ruta del register
             * para mayor ordenamiento de la autenticacion
             * esa logica se viene para la estrategia
             */
            const data = req.body;
            /** Validar el si el usuario esta registrado */
            const user = await userManager.readBy({ email });
            if(user){
                const error = new Error("Invalid credentials");
                error.status = 401;
                throw error;
            }
            /* Proteger la contraseña */
            data.password = createHash(password);
            const response = await userManager.createOne(data);
            /** El segundo parametro del done agrega al objeto de requerimientos
             * una propiedad user con los datos del usuario
             */
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
                const error = new Error("Invalid credentials.");
                error.status = 401;
                throw error
            }
            /* Validar contraseña */
            if(!verifyHash(password, response.password)){
                const error = new Error("Invalid credencials");
                error.statusCode = 401;
                throw error;
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
passport.use(
    "google",
    new GoogleStrategy(
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
)

export default passport;