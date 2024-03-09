const user_model = require('../models/user.model')
const bcryptjs = require('bcryptjs')

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