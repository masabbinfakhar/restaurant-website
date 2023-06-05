const mongoose=require("mongoose"); //This line imports the Mongoose library into the current module. Mongoose is an Object-Document Mapping (ODM) library for MongoDB, which provides a more intuitive way of working with MongoDB by providing a schema-based model for data.


const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{

        useUnifiedTopology:true,  

        //This option configures the MongoDB driver to use a new topology engine for handling server discovery and monitoring. This engine is designed to improve the handling of network errors and provide better support for replica sets and sharded clusters. Setting this option to true ensures that Mongoose uses the new topology engine, which is the recommended option for most applications.

        //Sharded clusters: A sharded cluster is a type of MongoDB deployment that distributes data across multiple servers or "shards" to improve scalability and performance. 

        //Topology: The topology of a MongoDB deployment refers to the configuration and organization of the servers that make up the deployment. The topology can include various components, such as replica sets, shards, and routers. 

         family:4 //This option specifies the IP address family to use when connecting to the MongoDB server. The default value is null, which allows the MongoDB driver to automatically detect the IP address family based on the server configuration. Setting this option to 4 forces the use of IPv4 addresses, which can be useful in some environments where IPv6 is not fully supported.
    
        }).then((data)=>{
        console.log(`Mongodb connected with server : ${data.connection.host}`);
    });
};

module.exports=connectDatabase;