const cartController = require('../controllers/cart.controller')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/createCart",cartController.createCart)
}