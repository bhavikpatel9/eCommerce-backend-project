const mongoose = require('mongoose')

const cart_model = mongoose.Schema({
    productName : {
        type : String,
        required : true,
        unique : true
    },
    Quantity  : {
        type : Number,
        default : 1
    }
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("cart",cart_model)