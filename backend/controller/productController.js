const ProductModel  = require("../model/ProductModel")



// Admin route ==> 
exports.createProduct = async(req , res) =>{
    try {
           const body = req.body;
      const data = await ProductModel.create(body)
       res.status(200).json({succes : true , data : data}  )
    } catch (error) {
       console.log(error.message);  
    }
}


exports.getAllProducts = async (req, res) => {
       res.send("Home route")
}