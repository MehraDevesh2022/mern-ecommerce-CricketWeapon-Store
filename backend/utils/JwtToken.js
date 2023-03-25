// this method will take user Data status code and res =>  Then Create Token and will saving in cookie ans send

const sendJWtToken  = (user , statusCode , res) =>{
   

;
    const token = user.getJWTToken(); //every user has access all userModel methods

     // options for cookie
    const options = {
        expires: new Date(
            // expiry date from now to  + process.env.COOKIE_EXPIRE (eg 5day) + convert it mili sec
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    
    // wrapping all data into cookie eg token and options data
    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendJWtToken;

