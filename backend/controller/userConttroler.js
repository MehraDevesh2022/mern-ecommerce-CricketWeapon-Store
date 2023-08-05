const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel");
const sendJWtToken = require("../utils/JwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


// signUp controller>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.registerUser = asyncWrapper(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Avatar", // this folder cloudainry data base manage by us
    width: 150,
    crop: "scale",
  });



  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    password,
    email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // sending the res and staus code along with token using sendJWtToken method
  sendJWtToken(user, 201, res);
});

// Login User >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.loginUser = asyncWrapper(async (req, res, next) => {
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

// logOut Controller =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.logoutUser = asyncWrapper(async (req, res) => {
  // delete token for logingOut user =>
  res.cookie("token", null, {
    // curr Token has null value
    expires: new Date(Date.now()), // expires curent
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out",
  });
});

//// Forgot Password >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.forgotPassword = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  // when user with this email not found
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken(); // we made this method into userModel for hash resetToken
  //when we call this metod  getResetPasswordToken  . so in userModel resetPasswordToken has reset token added and resetPasswordExprie also exprie value added but not saved to data base
  await user.save({ validateBeforeSave: false }); // now save

  let resetPasswordUrl = "";

  const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
  if (isLocal) {
    resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  } else {
    resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  }

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      // sendEmail is method writen by us in utils folder.
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // if there any Error then  user.resetPasswordToken and user.resetPasswordExpire has value saved already then undefined both od them for fresh value if user want to try again
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//>>>>>>>>>>>>>>> reset and update password :
exports.resetPassword = asyncWrapper(async (req, res, next) => {
  // creating token hash because we save resetPasswordToken  in hash form. and we send to user resetToken in hex bytes form in url . now converting that byte form to hex form for matching does user given reset token is same or not which one save in Database
  // we will extract reset token from req.params.token because we sended that token inside nodemailer message url when user will click on that link he will redirect on that  url

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .toString("hex");

  // now find that user with that hash token in db
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // if resetPasswordExpire {gt : => greater than} currDate  cheking is token expires or not
  });

  // if user not with that token or expire token
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  // when new pass or confirm pass are not same

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not equal to confirmPassword", 400)
    );
  }

  // set that new password
  user.password = req.body.password;
  //once pass set then no need token in data base untll user not reset the pass
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // savw change to db
  await user.save();
  // this will send new token to user  bcz user succesfully logged in with new pass
  sendJWtToken(user, 200, res);
});

//// Get User Detail  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getUserDetails = asyncWrapper(async (req, res) => {

  const user = await userModel.findById(req.user.id); // user.id because we set that user into as user.req when user gose autentiction. becauae all data of users set into req.user. only user when logged in then access this function
  res.status(200).json({
    success: true,
    user, // profile details of user
  });
});

// update User password>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.updatePassword = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password"); // + password because pass not allowed in shcema to acsess
   
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword); // user.comparePassword this method define in user Schema  for comapre given normal pass to savde hash pass
  // when user not found
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  // now set the new pass
  user.password = req.body.newPassword;
  await user.save();
  // now send new token to user . becasue user loggedin with new pass
  sendJWtToken(user, 200, res);
});

//>>>>>> Update user Profile>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.updateProfile = asyncWrapper(async (req, res, next) => {
  // object with user new data
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // if avatar not empty then
  if (req.body.avatar !== "") {
    const user = await userModel.findById(req.user.id);
    const imageId = user.avatar.public_id;

    //  await cloudinary.v2.uploader.destroy(imageId); // delete old Image from cloudnairy
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avatar", // this folder cloudainry data base manage by us
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id, // id for img
      url: myCloud.secure_url, // new User data
    };
  }

  // set new value of user
  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();
  res.status(200).json({
    success: true,
    user,
  });
});

//>> Get single user (admin) Access only>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  // if user not found with that id
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//>>>> update User Role -- Admin {may admin can change any user to admin}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.updateUserRole = asyncWrapper(async (req, res, next) => {
  // add set new role of user
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete user --Admin(only admin can delete user)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  // when no user found with that id
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // delete iamge from cloud as well
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  // if user founded the just remove from database
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// getAll user Admin>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllUser = asyncWrapper(async (req, res, next) => {
  const users = await userModel.find();

  res.status(201).json({
    success: true,
    users: users,
  });
});
