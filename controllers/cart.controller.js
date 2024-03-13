const cart_model = require('../models/cart.model')

exports.createCart = async (req,res)=>{
    const cart_obj = {
        "productName" : req.body.productName,
        "quantity" : req.body.quantity
    }

    try{
        const cart = await cart_model.create(cart_obj)

        res.status(201).send(cart)
    }catch(err){
        console.log("error while creating cart ",err)
        res.status(400).send({
            message : "error while creating cart"
        })
    }

    

}