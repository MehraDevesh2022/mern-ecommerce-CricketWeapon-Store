const asyncWrapper = require("../middleWare/asyncWrapper");
const orderModel = require("../model/orderModel");
const prdoductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");



//>>>>>>>>>>>>>>>  create a order    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
exports.newOrder = asyncWrapper(async (req, res, next) => {
     console.log(req.body);
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,
    shippingPrice,
    totalPrice }  = req.body;

    // create order :
  console.log(req.user._id, "user");
   const order = await orderModel.create({
    shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,
    shippingPrice,
    totalPrice ,
    user : req.user._id, // from authenticated user 
    paitAt : Date.now()
   })

   res.status(201).json({
    success : true ,
    order
   });

})


//>>>>>>>>>>>> getSingleOrder >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getSingleOrder = asyncWrapper(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id)
//   .populate(
//     // populate cheack for user id orderModel and will visit to userModel and bring from there user name and email as well with the help of user id in order
//     "user",
//     "name email"
//   );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// >>>>>>>>>>>>>>>> getUsers all orders >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.myOrders = asyncWrapper(async (req , res) =>{

 const userOrders = await orderModel.find({user : req.user._id}); // this id from authentictaion user.req

 res.status(200).json({
   success: true,
   userOrders
 });

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>> get all Orders -- Admin>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.getAllOrders = asyncWrapper(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;
// count total price of all order for dashbord
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
