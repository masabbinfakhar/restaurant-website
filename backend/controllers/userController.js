const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");
const cloudinary = require("cloudinary");


//register a user

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    // const {name,email,password,avatar}=req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });


    sendToken(user,201,res);
});

//Login user

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const {email,password}=req.body;

    //here we check that that user has given both email or password or not

    if(!email || !password){
        return next(new ErrorHander("Please enter email and password",400));
    }

    //yahan per humnay " .select("+password") is wajah say kara haai because humnay user model mai password ko select=false kara hoa hai"

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

     sendToken(user,200,res);

    });

    //Logout User

    exports.logout=catchAsyncErrors(async (req,res,next)=>{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        });

        res.status(200).json({
            success:true,
            message:"Logged Out",
        });

});


// forget password 

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});

    if(!user)
    {
        return next(new ErrorHander("User not found",404));
    }

    //get reset password token

    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it .`;

    try{
        await sendEmail({
            email:user.email,
            subject:`Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
    }
    catch(error)
    {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message,500));
    }
});

//Reset password

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

    //here we create the hash token 

    const resetPasswordToken=crypto.createHash("SHA256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},        
    });

    if(!user){
        return (new ErrorHander("Reset Password Token is invalid or has been expired ",400));
    }

    if(req.body.password!=req.body.confirmPassword){
        return next (new ErrorHander("Password does not password",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);
    
});

//get user details

exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});


//update User password

exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect",400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHander("password does not match",400));
    }

    user.password=req.body.newPassword;

    await user.save();

    res.status(200).json({
        success:true,
        user,
    });
});


//update User profile

exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }    

    const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        user,
    });
});

//get all user(admin)

exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find({role:"admin"});

    res.status(200).json({
        success:true,
        users,
    });
});


//get single user (admin)

exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user,
    });
});


//update User Role -- Admin

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });


//Delete User profile -- Admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    const imageId = user.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
