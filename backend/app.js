const  express = require("express");
const app  = express();
const product  = require    ("./route/productRoute")







app.use("/api/v1" , product);





module.exports = app