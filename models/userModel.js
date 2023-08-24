const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    email : String,
    password : String,
    confirmPassword : String


},{
    versionKey : false
})


const userModel = mongoose.model("User", userSchema)
module.exports = {
    userModel
}