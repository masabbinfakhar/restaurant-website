const ErrorHander=require("../utils/errorhander");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message= err.message || "Internal server error";


    //Wrong Mongodb Id error

    if(err.name === "castError"){
        const message = `Resourse not found.Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    //Mongoose duplicate key error :- this error occurs when we try to register with the email account already in DB so this will show error EE11000 
    
    if(err.code==11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHander(message,400);
    }

    //wrong JWT error

    if(err.name=="JsonWebTokenError"){
        const message=`Json web token is invalid try again`
        err=new ErrorHander(message,400);
    }

    // JWT expire error

      if(err.name=="TokenExpiredError"){
        const message=`Json web token is Expired try again`
        err=new ErrorHander(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};