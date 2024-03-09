const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const user_model = require('./models/user.model')
const server_config = require('./config/server.config')
const db_config = require('./config/db.config')

const app = express()

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",()=>{
    console.log("error while connecting with mongodb")
})

db.once("open",()=>{
    console.log("successfully connected to mongodb")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})
    
        if(user){
            console.log("admin is already present")
            return
        }
    }catch(err){
        console.log("error while reading the data "+ err)
    }

    try{
        const user = {
            name : "vishwa",
            userId : "admin",
            password : bcryptjs.hashSync("welcome1",8),
            email : "vishwa123@gmail.com",
            userType : "ADMIN"
        }
    
        const admin = await user_model.create(user)
        console.log("admin is created :"+ admin)

    }catch(err){
        console.log("error while creating admin "+err)
    }


}

app.listen(server_config.PORT,()=>{
    console.log('server is started on port : '+ server_config.PORT)
})
