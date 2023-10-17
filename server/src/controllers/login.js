const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

// // This route validates the giver password and email, sends the browser the JWT
// loginRouter.post("/api/login-local", async (request, response, next) => {
//     const { email, password } = request.body;

//     // Find all users with the given email
//     // Compare if any of the users password hash match the password given.
//     // If one matches, then fetch ID of that user
//     const user = await User.findOne({ email }); //TODO fix bug of finding an unverified user

//     try {
//         const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

//         if (!(user && passwordCorrect)) {
//             response.status(401).json({ error: "Invalid email or password" });
//         } else {
//             console.log("Password is valid");
//             const userForToken = { id: user._id };
//             const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
//             // console.log(`LOGINROUTER TOKEN ${token}`);
//             response.status(200).send(token);
//         }
//     } catch (error) {
//         next(error);
//     }
// });

loginRouter.post("/api/login-local", async (request, response, next) => {
    const { email, password } = request.body;
    console.log(`EMAIL ${email}`);
    console.log(`PASSWORD ${password}`);

    try {
        // Do not allow login of unverified user if that same email has a verified user
        // If there is a verified user then use that accounts password.
        const user = await User.findOne({ email, isVerified: true });
        if (user) {
            const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
            if (passwordCorrect) {
                console.log("Password is valid");
                const userForToken = { id: user._id };
                const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
                response.status(200).send(token);
            } else {
                return response.status(401).json({ error: "Invalid email or password" });
            }
        } else {
            const users = await User.find({ email });
            if (!users || users.length === 0) {
                return response.status(401).json({ error: "Invalid email or password" });
            }
            let userWithMatchingPassword = null;
            for (const user of users) {
                const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
                if (passwordCorrect) {
                    userWithMatchingPassword = user;
                    break; // Exit the loop once a matching password is found
                }
            }

            if (!userWithMatchingPassword) {
                return response.status(401).json({ error: "Invalid email or password" });
            } else {
                console.log("Password is valid");
                const userForToken = { id: userWithMatchingPassword._id };
                const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
                response.status(200).send(token);
            }
        }
    } catch (error) {
        console.error(`Login error: ${error}`);
        next(error);
    }
});

// This route uses the JWT sent via header to find the associated user from DB and return the user in response
loginRouter.get("/api/login-local/success", middleware.userExtractor, function (req, res) {
    console.log("LOGIN CONTROLLER");
    console.log(req.user);
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else if (!req.user) {
        res.status(403).json({ error: true, message: req.session.messages });
    }
});

module.exports = loginRouter;
