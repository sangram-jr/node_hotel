const express=require('express');
const router=express.Router();

//import the MenuItem model
const MenuItem=require('./../models/MenuItem');

//post method for menuItem
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        //save
        const response=await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
        
    }
    
})

//fetch the stored MenuItem data from server
router.get('/',async (req,res)=>{
    try{
        const data= await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//parametrized api for menu with respect ro taste
router.get('/:tasteType',async(req,res)=>{
    try{
        //extract the taste type 
        const tasteType=req.params.tasteType;
        if(tasteType=='spicy'|| tasteType=='sweet'|| tasteType=='sour'){
            const response=await MenuItem.find({taste:tasteType});
            console.log('responce fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid Taste Type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

//export the router
module.exports=router;