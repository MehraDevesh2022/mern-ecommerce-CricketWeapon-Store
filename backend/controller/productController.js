const { remove } = require("../model/ProductModel");
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
       
   const products  = await ProductModel.find();

   res.status(201).json({
       succes : true ,
       products : products
   })

}


//>>>>> Update  Admin Route 
exports.updateProduct = async(req , res , next) =>{

       let Product  = await ProductModel.findById(req.params.id );
      console.log(Product);
       if(!Product){
       return res.status(404).json({
              succes : false ,
              message: "Product not found, 404"
       })
    } 

    console.log(Product);
        Product = await Product.findByIdAndUpdate(req.params.id, req.body, {
              new: true,
              runValidators: true,
              useFindAndModify: false,
       });
         res.status(201).json({
              succes: true,
              message: Product
       })
}

exports.deleteProduct = async(req , res , next) =>{
   
       let product = await ProductModel.findById(req.params.id);
      
       if (!product) {
              return res.status(404).json({
                     succes: false,
                     message: "Product not found, 404"
              })
       }

   await product.remove();

      res.status(201).json({
             succes: true,
             message: "Product delete successfully"
      })

}