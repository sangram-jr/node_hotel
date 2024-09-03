const express=require('express')
const app=express();

//import db.js
const db=require('./db');

//define body parser
const bodyParser=require('body-parser')
app.use(bodyParser.json());  //req.body


//Get method
app.get('/',function(req,res){
    res.send("welcome to my hotel... How can i help you?");
})






//import the router files
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
//use the routes
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);




app.listen(3000,()=>{
    console.log("listening on port 3000");
    
})