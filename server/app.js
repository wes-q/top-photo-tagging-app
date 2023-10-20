const config = require("./src/utils/config");
const express = require("express");
const app = express();

//TODO try removing these 2 later
const bodyParser = require("body-parser");

const cors = require("cors");
const usersRouter = require("./src/controllers/users");
const loginRouter = require("./src/controllers/login");
const authRouter = require("./src/controllers/auth");
const emailRouter = require("./src/controllers/email");
const characterLocationsRouter = require("./src/controllers/characterLocations");
const scoresRouter = require("./src/controllers/scores");

const middleware = require("./src/utils/middleware");
const winstonLogger = require("./src/utils/winstonLogger");

const mongoose = require("mongoose");

//Add session support
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const path = require("path");

mongoose.set("strictQuery", false);

winstonLogger.info(`connecting to ${config.MONGODB_URI}`);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        winstonLogger.info("Connected to MongoDB");
    } catch (error) {
        winstonLogger.error("Error connecting to MongoDB:", error.message);
    }
};
connectToMongoDB();

app.use(
    cors({
        origin: config.FRONTEND_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        optionSuccessStatus: 200,
        Headers: true,
        exposedHeaders: "Set-Cookie",
        allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization"],
    })
);

app.use(express.static(path.join(__dirname, "dist")));

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// app.set("views", path.join(__dirname, "views"));
// app.use(express.static("dist"));
// Serve images like profile photos
// app.use(express.static("uploads"));
app.use("/static", express.static("uploads"));

// app.use(middleware.requestLogger);
app.use((req, res, next) => {
    winstonLogger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "secr3t",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: config.SESSIONSDB_URI }),
    })
);

//Authenticate the session
// app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
//app.use(middleware.tokenExtractor); //moved the token extractor inside userextractor

app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", loginRouter);
app.use("/", emailRouter);
app.use("/", characterLocationsRouter);
app.use("/", scoresRouter);

app.use(middleware.errorHandler);

module.exports = app;
