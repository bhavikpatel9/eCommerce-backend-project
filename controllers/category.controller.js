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

exports.readCategory = async (req,res)=>{

    const categories = await category_model.find()

    if(!categories){
        return res.status(400).send({
            message : "no categoies has been created"
        })
    }
    
    res.status(200).send(categories)

}

exports.byNameReadCategory = async (req,res)=>{

    try{
        const category = await category_model.findOne({name : req.body.name})

        if(!category){
            return res.status(400).send({
                message : "category not found"
            })
        }
        res.status(200).send(category)
    }catch(err){
        console.log("error while reading category" + err)
        res.status(400).send({
            message : "error while reading category"
        })
    }

}

exports.updateCategories = async (req,res)=>{
    const categoryName = req.body.categoryName
    const whatYouWantToUpdate = req.body.whatYouWantToUpdate
    const newText = req.body.newText

    try{
       
        const cat = await category_model.findOne({name : categoryName})
        console.log(cat)

        if (!cat) {
            return res.status(404).send({ message: "Category not found" });
        }
        
        cat[whatYouWantToUpdate] = newText
        const updateCat = await cat.save()
        res.status(200).send(updateCat)

    }catch(err){
        console.log("error while updating category"+ err)
        res.status(400).send({
            message : "error while updating category"
        })
    }
}

exports.deleteCategories = async (req,res)=>{
    const del_cat = await category_model.findOneAndDelete({name : req.body.name})
    if(!del_cat){
        res.status(404).send({
            message : "category not found"
        })
    }
    res.status(200).send(del_cat)
}