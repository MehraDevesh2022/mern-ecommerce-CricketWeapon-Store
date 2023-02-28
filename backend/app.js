const  express = require("express");
const app  = express();
const errorMiddleware   = require("./middleWare/error")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // used for image and other files

// routes
const product = require("./route/productRoute");
 app.use("api/v1/profile/update" , (req , res) =>{
    console.log(req.body);
 })
const user = require("./route/userRoute");
const order = require("./route/orderRoute");



app.use(express.json())
app.use(fileUpload());
// Middleware for Errors
app.use(errorMiddleware);
// for req.cookie to get token while autentication 
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/v1" , product);
app.use("/api/v1", user);
app.use("/api/v1", order);



module.exports = app