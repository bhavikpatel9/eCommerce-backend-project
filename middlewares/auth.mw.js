const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = require('../config/auth.config')

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

const verifySignInBody = (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

const verifyToken = (req,res,next)=>{
    //check if token is present or not
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message : "bad request,token not found : unAuthorized"
        })
    }
    //check for valid token

    jwt.verify(token,secret.secretMsg,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "unAuthorized!  may be token is expired"
            })
        }
        const user = await user_model.findOne({userId : decoded.id})

        if(!user){
            return res.status(400).send({
                message : "user doesn't exist for this token"
            })
        }
        //set the user info in req body
        req.user = user

        //move to next
        next()
    })

}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user.userType == "ADMIN"){
        next()
    }
    else{
        res.status(403).send({
            message : "only ADMIN can create category"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}