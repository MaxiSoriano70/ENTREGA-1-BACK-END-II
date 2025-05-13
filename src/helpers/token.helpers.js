import jsonwebtoken from "jsonwebtoken";

const createToken = (data) => {
    try {
        const token = jsonwebtoken.sign(data, process.env.SECRETJWT, { expiresIn : 60*60*24*7 });
        return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}

const verifyToken = ( token ) => {
    try {
        const verify = jsonwebtoken.verify(token, process.env.SECRETJWT);
        return verify;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};

export { createToken, verifyToken }