const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middlewares/errorHandler");
// import routers
const seedRouter = require("./routers/seedRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

// rate limiter
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests from this IP, please try again after 1 minute",
});
// api security
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(xssClean());
app.use(mongoSanitize());
// app.use(rateLimiter);

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
// body parser
app.use(express.json());

// use morgan
app.use(morgan("dev"));

// routes
app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// health check
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "yeah, I am working fine.",
  });
});

// no route found middleware
app.use((req, res, next) => {
  next(createError(404, "Requested route not found."));
});

// error handler middleware
app.use(errorHandler);

module.exports = app;
