const express = require("express");
const app = express();
const mongoose = require("mongoose");


const cors = require("cors")

const {userRoute} = require("./routes/userRoutes")
const {doctorsRoute} = require("./routes/doctorsRoutes")
require("dotenv").config()

app.use(cors());
app.use(express.json())

app.use("/user",userRoute)
app.use("/doctor",doctorsRoute)

const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected");
    }catch(err){
        console.log(err.message);
    }
}

app.listen(process.env.PORT, () => {

connect();
console.log("listening on PORT");

})