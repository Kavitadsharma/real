const express=require("express")
const companiesRoute=express.Router()
const {companiesModel}=require("../model/companies")

companiesRoute.get("/",(req,res)=>{
    res.status(200).send("welcome to our company ")
})
companiesRoute.post("/add",async(req,res)=>{
    const payload=req.body;
    
    try{
        const companies=new companiesModel(payload)
        await companies.save()
        res.status(200).send({message:"companies created"})
    }catch(err){
       
res.status(400).send({message:"error"})
    }
})

companiesRoute.get("/companies",async(req,res)=>{
    try{
        const companies= await companiesModel.find()
        res.status(200).send({message:companies})
    }catch(err){
        res.status(400).send({message:err})
    }
})
companiesRoute.get("/companies/:id", async (req, res) => {
    const companiesId = req.params.id;
  
    try {
      const companies = await companiesModel.findById(companiesId);
  
      if (companies) {
        res.status(200).send({ message: "companies found", companies });
      } else {
        res.status(404).send({ message: "companies not found" });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });
  
companiesRoute.delete("/delete/:id",async(req,res)=>{
    const companiesId=req.params.id
    try{
      await companiesModel.findByIdAndDelete({_id:companiesId})
        res.status(200).send({message:"companies Delete"})
    }catch(err){
        res.status(400).send({message:err})
    }
})
companiesRoute.patch("/update/:id", async (req, res) => {
    const companiesId = req.params.id;
    const {payload} = req.body;
  
    try {
      const updatedcompanies = await companiesModel.findByIdAndUpdate(
        companiesId,
        {payload},
        { new: true } 
      );
  
      if (updatedcompanies) {
        res.status(200).send({ message: "companies updated", updatedcompanies });
      } else {
        res.status(404).send({ message: "companies not found" });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  
  


  companiesRoute.patch("/updateAll", async (req, res) => {
    try {
      const updatedcompaniess = await companiesModel.updateMany(
        { 'variants': { $elemMatch: { $exists: true } } },
        { $set: { 'variants.$[].display': false } }
      );
  
      if (updatedcompaniess.nModified > 0) {
        res.status(200).send({ message: "All companiess updated", updatedcompaniess });
      } else {
        res.status(404).send({ message: "No companiess found" });
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });
  










module.exports={companiesRoute}