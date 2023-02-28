const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");



exports.isAuthentictedUser = asyncWrapper(async (req , res , next) =>{
 // grab the token from cookie . while user logedin token sended inside cookie from server . so if user want to access somthing then cookie also sended from clint side in req object for authentication
 console.log(req.body)
 ;
    const { token } = req.cookies; // import cookieParser for using req.cookies same like for json data  app.use(express.json()); for this app.use(cookieParser());
// if there is no token found
if(!token){
    return next(new ErrorHandler("Please Login to access this resource", 401)); // 401 when server no what req wants but denied that req
}

// now verify that token with seceret key . 
    const deCodeToken = jwt.verify(token, process.env.JWT_SECRET);

    // now get user id from deCodeToken because when we make token in userSchema so we added userID in payLoad section. with that id get user and store inside req object .

    req.user = await userModel.findById(deCodeToken.id);  // now we have ascces that user in any where inside req.user untill user logged in

    // call next . bcz this user has access to reqested resource
    next();

})

// this function for access of routes and controle like => update product , delete product, createProduct. only admin can do this
      // taking role as param and converting it into array using spread operator. for using array method
exports.authorizeRoles = (...roles) =>{
 return (req , res , next) =>{
     if (roles.includes(req.user.role) ===false){  // before entering this route user done autehntciation and that time we add complete user into req.user so here we have req.user.role .
        return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce `,
                403)
        )
     }
     // if user has role as admin then go ahead.
    next();
 }
}  