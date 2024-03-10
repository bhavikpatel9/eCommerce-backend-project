const user_model = require('../models/user.model')

const verifySignUpBody = async (req,res,next)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                message : "name was not provided in request body"
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                message : "email was not provided in request body"
            })
        }
        if(!req.body.userId){
            return res.status(400).send({
                message : "userId was not provided in request body"
            })
        }
        const user = await user_model.findOne({userId : req.body.userId})
    
        if(user){
            return res.status(400).send({
                message : "userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("error while validating(checking) request object",err)
        res.status(500).send({
            message : "error while validating request body"
        })
    }

}

module.exports = {
    verifySignUpBody : verifySignUpBody
}