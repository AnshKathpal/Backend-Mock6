const mongoose=require("mongoose")

const doctorsSchema=mongoose.Schema({
   name : String,
   imageURL : String,
   specialization : String,
   experience : Number,
   location : String,
   date : String,
   slots : Number,
   fee : Number
},{
    versionKey:false
})

const doctorsModel=mongoose.model("doctors",doctorsSchema)

module.exports={
    doctorsModel
}
