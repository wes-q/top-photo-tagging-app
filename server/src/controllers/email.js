const middleware = require("../utils/middleware");
const emailRouter = require("express").Router();
const sendEmail = require("../utils/sendEmail");

emailRouter.get("/api/send-verification-email", middleware.userExtractor, async (request, response, next) => {
    try {
        sendEmail(request.user.email, request.user.displayName, request.user.verificationToken);
        response.status(200).json({ message: `Email sent to ${request.user.email}` });
    } catch (error) {
        next(error);
    }
});

module.exports = emailRouter;
