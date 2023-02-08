const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");



exports.isAuthentictedUser = asyncWrapper(async (req , res , next) =>{
 // grab the token from cookie . while user logedin token sended inside cookie from server . so if user want to access somthing then cookie also sended from clint side in req object for authentication
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