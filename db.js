const mongoose=require('mongoose');

//define the MongoDB url
const mongoURL='mongodb://localhost:27017/hotels' //replace mydatabase with your database name

//set up mongodb connection
mongoose.connect(mongoURL)
    


//Get the default connection
//Mongoose maintain a default connection object representing the MongoDB connection
const db=mongoose.connection;

//define event listener for database connection
db.on('connected',()=>{
    console.log('connect to MongoDB server');    
});
db.on('error',(err)=>{
    console.log('MongoDB connection is error:',err);
});
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');   
});

//Export the database connection
module.exports=db;
