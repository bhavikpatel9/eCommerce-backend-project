const product_model = require('../models/product.model')

exports.createProduct = async (req,res)=>{
    //read data and create obj
    const product = {
        categoryName : req.body.categoryName,
        productName : req.body.productName,
        price : req.body.price
    }
    //add to db
    try{
        const created_product = await product_model.create(product)
    
        if(!created_product){
            res.status(400).send({
                message : "error while adding data to DB"
            })
        }
    
        res.status(201).send(created_product)
    }catch(err){
        console.log("error while creating product ", err)
        res.status(400).send({
            message : "error while creating product"
        })
    }
}