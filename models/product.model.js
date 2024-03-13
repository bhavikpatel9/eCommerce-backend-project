const mongoose = require('mongoose')

const product_model = mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    productName : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true
    }
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("product",product_model)