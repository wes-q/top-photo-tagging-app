const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
const { validationResult } = require("express-validator");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.log(error);

    if (error.name === "CastError") {
        console.log("MIDDLEWARE CAST ERROR malformatted id");
        return response.status(400).send({ error: "MIDDLEWARE CAST ERROR malformatted id" });
    } else if (error.name === "ValidationError") {
        console.log("MIDDLEWARE VALIDATION ERROR ");
        return response.status(400).json({ error: `${error.message}` });
    } else if (error.name === "JsonWebTokenError") {
        console.log("MIDDLEWARE JSONWEBTOKEN ERROR ");
        return response.status(401).json({ error: `${error.message}` });
    } else if (error.name === "TokenExpiredError") {
        console.log("MIDDLEWARE TOKEN EXPIRED ERROR ");
        return response.status(401).json({ error: `${error.message}` });
    } else if (error.name === "ReferenceError") {
        console.log("MIDDLEWARE TOKEN REFERENCE ERROR ");
        return response.status(401).json({ error: `${error.message}` });
    }
    // If the error is not one of the specified types, you can call next(error) to pass it to the default error handler.
    console.log("MIDDLEWARE ERROR IS NOT ONE OF THE SPECIFIED TYPES");
    return response.status(500).json({ error: `(500) Internal server error:  ${error.message} \n Click here to send feedback to the devs.` });
    // next(error);
    // console.log("congraTS");
};

// moved the token extractor inside user extractor
// const tokenExtractor = (request, response, next) => {
//     const authorization = request.get("authorization");
//     console.log("MIDDLEWARE TOKENEXTRACTOR");
//     console.log(authorization);
//     if (authorization && authorization.startsWith("Bearer ")) {
//         request.token = authorization.replace("Bearer ", "");
//     }
//     next(); // Continue to the next middleware or route handler
// };

const userExtractor = async (request, response, next) => {
    const authorization = request.get("authorization");
    console.log("MIDDLEWARE TOKENEXTRACTOR");
    console.log(authorization);
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }

    console.log(`USEREXTRACTOR ${request.token}`);
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        console.log(decodedToken);
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token invalid" });
        }

        const user = await User.findById(decodedToken.id);
        console.log(user);

        request.user = user;
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        // return response.status(401).json({ error: "token invalid catch" });
        next(error);
    }
};

const validateRequestSchema = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        // EXPRESS VALIDATOR ERRORS go here. they respond with json
        return response.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor,
    validateRequestSchema,
};
