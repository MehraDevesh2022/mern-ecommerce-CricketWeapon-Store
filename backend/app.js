const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // used for image and other files
const path = require("path");
const cors = require("cors");
const ErrorHandler = require("./utils/errorHandler");
require("dotenv").config({ path: "./config/config.env" });

// routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");

// Add request logging middleware (only in development or when LOG_REQUESTS is true)
if (process.env.NODE_ENV === "development" || process.env.LOG_REQUESTS === "true") {
  app.use(requestLogger);
}

// for req.cookie to get token while authentication
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());

// API routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);

// 404 handler for unmatched API routes (must come before static files)
app.use("/api", (req, res, next) => {
  next(
    new ErrorHandler(
      `API route not found: ${req.method} ${req.originalUrl}`,
      404,
      ErrorHandler.CODES.NOT_FOUND
    )
  );
});

// Serve frontend static files
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frotend/build")));

// Catch-all: serve React app for non-API routes
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frotend", "build", "index.html"))
);

// Global error middleware — must be last
app.use(errorMiddleware);

module.exports = app;
