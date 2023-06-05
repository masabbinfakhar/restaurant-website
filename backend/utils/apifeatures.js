class ApiFeatures{
    // * query : just like we use "find" in get all products function
    // * querystr : we use item name which is also know as a keyword for example : chicken 
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:"i",
            },

        } 
        : {};

        // console.log(keyword);

        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.querystr}

        //removing some fields for category

        const removeFields=["keyword","page","limit"];

        removeFields.forEach((key)=>delete queryCopy[key]);


        // Filter For price and Rating

        //console.log(queryCopy);

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));

       // console.log(queryStr);

        return this;

    }

        pagination(resultPerPage){

            const currentPage=Number(this.querystr.page)||1;

            const skip = resultPerPage * (currentPage-1);

            this.query=this.query.limit(resultPerPage).skip(skip);

            return this;

    }


};

module.exports = ApiFeatures;