const express=require('express');
const router=express.Router();

//import the person model
const person=require('./../models/person');

//post method for person
router.post('/',async(req,res)=>{
    try{

        const data=req.body; //assuming that all person data are included in req.body
        //create a new person document using the mongoose model
        const newPerson=new person(data);
        //save the newperson to the database
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    
})

//fetch the stored person data from server
router.get('/',async (req,res)=>{
    try{
        const data= await person.find();
        console.log('data fetched');
        res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//parametrized api call for person work type
router.get('/:workType',async(req,res)=>{
    try{
        //extract the work type from the URL parameter
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
            const response=await person.find({work:workType});
            console.log('responce fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid Work Type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

//put method for updation
router.put('/:id',async(req,res)=>{
    try{
        //Extract id from the URL parameter
        const personId=req.params.id;
        //updated data for the person
        const updatedPersonData=req.body;

        const responce=await person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,  //retrun the new updated document
            runValidators: true,   //Runs mongoose validator
        })

        if(!responce){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(responce);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid server Error'});
        
    }
})

//delete method for deletion
router.delete('/:id',async(req,res)=>{
    try{
        //Extract id from the URL parameter
        const personId=req.params.id;

        const responce=await person.findByIdAndUpdate(personId);

        if(!responce){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid server Error'});
        
    }
})


//export the router
module.exports=router;