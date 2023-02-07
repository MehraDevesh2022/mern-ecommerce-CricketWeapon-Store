const  express = require("express");
const app  = express();
const product  = require    ("./route/productRoute")
const user  = require("./route/userRoute");
const errorMiddleware   = require("./middleWare/error")
const bodyParser = require("body-parser");
app.use(express.json())


app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1" , product);
app.use("/api/v1", user);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app