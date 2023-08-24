const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userModel} = require("../models/userModel")

const userRoute = express.Router();

userRoute.post("/signup", async(req,res) => {
    const {email,password,confirmPassword} = req.body
    try{

        const user = await userModel.findOne({email})
        if(password !== confirmPassword){
            res.status(200).json({err : "Both the password should be same"})
        }else if(user){
            res.status(200).json({err : "User Already Existed, Please Login!"})
        }else{
            bcrypt.hash(password,7,async(err,hash) =>{

                if(err) {
                    res.status(200).json({err : err.message})
                }else{
                    const user = new userModel({email,password : hash, confirmPassword : hash})
                    await user.save();
                    res.status(200).json({msg : "User Account has been Registered"})
                }

            })
        }

    }catch(err){
        res.status(400).end({err : err.message})
    }

})


userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token =jwt.sign({userID:user._id},process.env.secretCode,{expiresIn:'4d'})
                    res.status(200).json({msg:"Login Successful",token})
                }
                else{
                    res.status(200).json({err:"Wrong password"})
                }
            })
        }
        else{
            res.status(200).json({err:"Invalid Credentials"})  
        }
    }
    catch(err){
        res.status(400).end({err:err.message})
    }
})

module.exports = {
userRoute
}