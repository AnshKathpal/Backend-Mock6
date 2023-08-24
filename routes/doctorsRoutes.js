const express = require("express");
const {doctorsModel} = require("../models/doctorsModel")

const doctorsRoute = express.Router();
doctorsRoute.post("/appointments",async(req,res) => {
    try {
        const doc = new doctorsModel(req.body)
        await doc.save()
        res.status(200).json({msg : "New Doctor has been added", doctor : req.body})
    } catch (error) {
        res.status(400).json({err : error.message })
    }
})


doctorsRoute.get("/", async(req,res) => {

    const {name,sort} = req.query;
    try{
let search = {}
let sortby = {}

if(name){
    search.name = name
}

if(sort == "asc"){
    sortby.date = 1
}
else if(sort == "desc"){
    sortby.date = -1
}else{
    sortby = null
}
if(name){
    search.name = ({$regex : name, $options : "i"})
}


const data = await doctorsModel.find(search).sort(sortby)
res.status(200).json({msg : data})
    }catch(error){
res.status(400).json({msg : error.message})
    }

})

doctorsRoute.patch("/update/:postID",async(req,res) => {
    try{
            const updateDoc = await doctorsModel.findByIdAndUpdate(
                req.params.postID,
                req.body,
                {new : true}
            )
            res.send(updateDoc)
    }catch(error){
res.status(400).end(error)
    }
})


doctorsRoute.delete("/delete/:postID",async(req,res) => {
    try{
            const deleteDoc = await doctorsModel.findByIdAndDelete(
                req.params.postID,
                req.body,
                {new : true}
            )
            res.send(deleteDoc)
    }catch(error){
res.status(400).end(error)
    }
})

module.exports = {
    doctorsRoute
}