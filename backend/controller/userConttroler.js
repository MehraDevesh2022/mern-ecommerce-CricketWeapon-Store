const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel")
const sendJWtToken = require("../utils/JwtToken");
 

// signUp controller
exports.registerUser = asyncWrapper(async (req , res) =>{

      const {name , email , password}  = req.body ;
    const user = await userModel.create({
        name ,
        password ,
        email, 
        avatar :{
            public_id: "myCloud.public_id",
            url: "myCloud.secure_url",
        }
     })

  // sending the res and staus code along with token using sendJWtToken method
  sendJWtToken(user , 201 , res);
})


// Login User 
exports.loginUser = asyncWrapper(async (req , res , next) =>{

  const { email, password } = req.body;

 // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await userModel.findOne({ email }).select("+password"); // .select("+password") because in schema we set set select : false so password is'nt return to anyone so we add +password here for verfication of pass
  
    // jab user nhi mila data base main given credentials ke sath tab
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

  // comparePassword method defind in useSchema by use . it will comapre this password to hashfrom password at database
    const isPasswordMatched = await user.comparePassword(password);

   // when password not mathced with original hashed password
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendJWtToken(user, 200, res); 
});


// logOut Controller =>

exports.logoutUser  = asyncWrapper(async (req , res ) =>{


  // delete token for logingOut user =>
  res.cookie("token" , null ,{ // curr Token has null value
    expires: new Date(Date.now()), // expires curent
    httpOnly: true,
  }) 

  res.status(200).json({
 success : true ,
    message : "User logged out"
  })

})
