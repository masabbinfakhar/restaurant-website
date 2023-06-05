const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter item name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter item description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter item Price"],
        maxLenght:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        // ismai humnay public_id or url is wajah say liya haai kiyon kah jub hum cloud per image upload kartay haain tou humhai public_id or url milta haai 
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter item category"],
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    // yai "user" is liya create kara hai for example agar website two persons nay mil kar develop kari haai and both have admin access tou jub koi bhi aik banda in dono mai say item add karay ga tou apas mai confusion na ho kaah item kisnay add kari haai is liya hum item kay saath ID bhi show karain gaay 
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Product",productSchema);