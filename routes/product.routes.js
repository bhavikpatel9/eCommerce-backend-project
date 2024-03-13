const product_controller = require('../controllers/product.controller')
const authMW = require('../middlewares/auth.mw')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/createProduct",[authMW.verifyToken,authMW.isAdmin],product_controller.createProduct)
}