const express = require('express')
require("dotenv").config()
const {connection}=require("./config/db")
const {companiesRoute}=require("./routes/companiesRoute")
const {orderRoutes}=require("./routes/orderRoute")
const {statsRoute}=require("./routes/statsRoute")
const app=express()
app.use(express.json())

app.use('/',companiesRoute)
app.use('/',orderRoutes)
app.use('/',statsRoute)




app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongoose")
    }catch(err){
console.log(err)
    }
    console.log(`server running to ${process.env.port}`)
})