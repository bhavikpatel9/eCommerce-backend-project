const categoryController = require('../controllers/category.controller')
const authMW = require('../middlewares/auth.mw')

module.exports = (app)=>{
  app.post("/ecomm/api/v1/categories",[authMW.verifyToken,authMW.isAdmin],categoryController.createCategory)
}