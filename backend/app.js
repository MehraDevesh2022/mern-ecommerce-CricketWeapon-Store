const  express = require("express");
const app  = express();
const product  = require    ("./route/productRoute")
const user  = require("./route/userRoute");
const errorMiddleware   = require("./middleWare/error")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json())

// Middleware for Errors
app.use(errorMiddleware);
// for req.cookie to get token while autentication 
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1" , product);
app.use("/api/v1", user);


;
module.exports = app