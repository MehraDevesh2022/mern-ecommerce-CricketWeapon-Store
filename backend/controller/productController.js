const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");


// >>>>>>>>>>>>>>>>>>>>>  Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createProduct = asyncWrapper(async (req, res) => {

       const body = req.body;

       // when we have muliple admin . to ishe ye pta chlgea kiss admin ne konsa product cretae kiya hai. q ki product schema main user section main usg user ki id add ho jayegi.
       req.body.user = req.user.id // req.user created by us.. user all data store in this object from there we are adding user id to the products user section

       const data = await ProductModel.create(body)
    
       res.status(200).json({ succes: true, data: data })

       
       console.log(error.message);

}
)

exports.getAllProducts = asyncWrapper(async (req, res) => {
       const resultPerPage  = 5; // per page products visibile
     // const products = await ProductModel.find();
       const productsCount  = await ProductModel.countDocuments(); // it returns product length
       // ApiFeatures is class and we making here intsance of that . and passing 2 args : => agr : ProductModel.find() ==> reciving as  query in constructor , and   req.query ==> reciving as  queryString in constructor
       const apiFeature = new ApiFeatures(ProductModel.find() , req.query).search().filter().Pagination(resultPerPage)
     


       let products = await apiFeature.query;  // whatever data is return base on filter fetching here using apiFeature.query where apiFeature is complete object of ApiFeatures class with req data. and query is property form ApiFeatures class same like queryString , query storing req data here
       // if  there is no value in query string then all prodcut is return here in apiFeature.query 
          
       res.status(201).json({
              succes: true,
              products: products,
              productsCount : productsCount
            
       })

})


//>>>>>>>>>>>>>>>>>> Update  Admin Route >>>>>>>>>>>>>>>>>>>>>>>
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