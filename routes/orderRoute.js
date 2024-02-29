const express=require("express")
const orderRoutes=express.Router()
const {orderModel}=require("../model/orders")

orderRoutes.get("/",(req,res)=>{
    res.status(200).send("welcome to our company ")
})
orderRoutes.post("/add",async(req,res)=>{
    const payload=req.body;
    
    try{
        const order=new orderModel(payload)
        await order.save()
        res.status(200).send({message:"order created"})
    }catch(err){
       
res.status(400).send({message:"error"})
    }
})

orderRoutes.get("/order",async(req,res)=>{
    try{
        const order= await orderModel.find()
        res.status(200).send({message:order})
    }catch(err){
        res.status(400).send({message:err})
    }
})
orderRoutes.get("/order/:id", async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await orderModel.findById(orderId);
  
      if (order) {
        res.status(200).send({ message: "order found", order });
      } else {
        res.status(404).send({ message: "order not found" });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });
  
orderRoutes.delete("/delete/:id",async(req,res)=>{
    const orderId=req.params.id
    try{
      await orderModel.findByIdAndDelete({_id:orderId})
        res.status(200).send({message:"order Delete"})
    }catch(err){
        res.status(400).send({message:err})
    }
})
orderRoutes.patch("/update/:id", async (req, res) => {
    const orderId = req.params.id;
    const { payload} = req.body;
  
    try {
      const updatedorder = await orderModel.findByIdAndUpdate(
        orderId,
        { payload },
        { new: true } 
      );
  
      if (updatedorder) {
        res.status(200).send({ message: "order updated", updatedorder });
      } else {
        res.status(404).send({ message: "order not found" });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  });

  
  


  orderRoutes.patch("/updateAll", async (req, res) => {
    try {
      const updatedorders = await orderModel.updateMany(
        { 'variants': { $elemMatch: { $exists: true } } },
        { $set: { 'variants.$[].display': false } }
      );
  
      if (updatedorders.nModified > 0) {
        res.status(200).send({ message: "All orders updated", updatedorders });
      } else {
        res.status(404).send({ message: "No orders found" });
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });
  










module.exports={orderRoutes}