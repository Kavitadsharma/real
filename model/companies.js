const mongoose=require("mongoose")
const companiesSchema=mongoose.Schema({
    name:String,
    symbol:String
})
const companiesModel=mongoose.model("companies",companiesSchema)

module.exports={companiesModel}