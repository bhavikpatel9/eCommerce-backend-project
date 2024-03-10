const category_model = require('../models/category.model')

exports.createCategory = async (req,res)=>{
//read the req body and create object
const category_obj = {
    name : req.body.name,
    description : req.body.description
}

try{
    //store in db
    const category = await category_model.create(category_obj)
    //return the response
    res.status(201).send(category)
}catch(err){
    console.log("error while creating category"+err)
    res.status(500).send({
        message : "error while creating category"
    })
}
}