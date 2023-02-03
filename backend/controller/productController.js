const ProductModel  = require("../model/ProductModel")

exports.getAllProducts = async(req , res) =>{
       res.send("Home route")
}
// exports.createProduct = async(req , res) =>{
//     const body = req.body;
//     const  data = await ProductModel.create(body)
//     res.send(data)
// }