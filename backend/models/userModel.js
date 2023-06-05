// " npm i bcrypt jsonwebtoken validator nodemailer cookie-parser body-parser " yai command humnay use kari thi is file ko banay say phalay 


const mongoose=require("mongoose");
const validator=require("validator"); // This line of code is importing the validator package in a Node.js application. The validator package is a library of string validators and sanitizers that can be used to validate user input and data.
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");



const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false  //isko is liya false rakha haai because jub admin agar yai dekhna chahayy kaah kitnay users haain tou wo find() ki query laagaye gaa tou usko "select:false " ki wajah say un users kay passwords show nahi hongay
    },
    avatar:{
        //yahan per her user ki sirf 1 pic hogi that's why humnay ismai array use nahi kaara
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


//yahan humnay arrow function use nahi kara becuase jub humhai "this" use karna hota hai tou hum arrow function nahi use kartay 
userSchema.pre("save",async function(next){

    if(!this.isModified("password"))
    {
        next();
    }
    
    // "10" power haai kaah hash kitna strong hoga
    this.password =await bcrypt.hash(this.password,10)
});

// JWT TOKEN : token genrate kar kay cookie mai store karlain gaay 

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


//Compare password

userSchema.methods.comparePassword= async function (enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password);
};

    //genrating Password Reset token

    userSchema.methods.getResetPasswordToken=function(){

        //Generating Token

        const resetToken=crypto.randomBytes(20).toString("hex");

        //hashing and adding reset password token to user schema

        this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

        this.resetPasswordExpire=Date.now()+15*60*1000;

        return resetToken;


};


module.exports=mongoose.model("User",userSchema);