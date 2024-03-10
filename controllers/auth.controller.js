const user_model = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/auth.config')

exports.signup = async (req,res)=>{
    const req_body = req.body

    userObj = {
        name : req_body.name,
        userId : req_body.userId,
        password : bcryptjs.hashSync(req_body.password,8),
        email : req_body.email,
        userType : req_body.userType
    }

    try{
        const user_created = await user_model.create(userObj)

        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType
        }

        res.status(201).send(res_obj)
    }catch(err){
        console.log("error while registering user"+err)
        res.status(500).send({
            message : "some error occured while registering user"
        })
    }

}

exports.signin = async (req,res)=>{
    //find userid
    const user = await user_model.findOne({userId : req.body.userId})

    if(!user){
        return res.status(400).send({
            message : "userId is not found"
        })
    }

    //check password
    const isPasswordValid = bcryptjs.compareSync(req.body.password,user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message : "password is not correct"
        })
    }
    //give token
    const token = jwt.sign({id : user.userId},secret.secretMsg,{expiresIn : 120})

    res.status(200).send({
        name : user.name,
        email : user.email,
        accessToken : token
    })
}