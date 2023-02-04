const  express = require("express");
const app  = express();
const product  = require    ("./route/productRoute")
const errorMiddleware   = require("./middleWare/error")

app.use(express.json())




app.use("/api/v1" , product);



// Middleware for Errors
app.use(errorMiddleware);

module.exports = app