const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper")


// >>>>>>>>>>>>>>>>>>>>>Admin route 
exports.createProduct = asyncWrapper(async (req, res) => {

       const body = req.body;
       const data = await ProductModel.create(body)
       res.status(200).json({ succes: true, data: data })

       console.log(error.message);

}
)


exports.getAllProducts = asyncWrapper(async (req, res) => {

       const products = await ProductModel.find();

       res.status(201).json({
              succes: true,
              products: products
       })

})


//>>>>>>>>>>>>>>>>>> Update  Admin Route 
exports.updateProduct = asyncWrapper(async (req, res, next) => {

       let Product = await ProductModel.findById(req.params.id);
       console.log(Product);
       if (!Product) {
              return next(new ErrorHandler("Product not found", 404))
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
})

exports.deleteProduct = asyncWrapper(async (req, res, next) => {

       let product = await ProductModel.findById(req.params.id);

       if (!product) {
              return next(new ErrorHandler("Product not found", 404))
       }

       await product.remove();

       res.status(201).json({
              succes: true,
              message: "Product delete successfully"
       })

})
exports.getSingleProduct = asyncWrapper(async (req, res, next) => {

       const id = req.params.id;
       const Product = await ProductModel.findById(id);
       if (!Product) {
              return next(new ErrorHandler("Product not found", 404))
       }
       res.status(201).json({
              succes: true,
              message: Product
       })

})