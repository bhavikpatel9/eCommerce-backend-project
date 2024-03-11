const categoryController = require('../controllers/category.controller')
const authMW = require('../middlewares/auth.mw')

module.exports = (app)=>{
  app.post("/ecomm/api/v1/categories",[authMW.verifyToken,authMW.isAdmin],categoryController.createCategory)

  app.get("/ecomm/api/v1/readCategories",categoryController.readCategory)
  app.get("/ecomm/api/v1/byNameReadCategories",categoryController.byNameReadCategory)

  app.put("/ecomm/api/v1/updateCategories",categoryController.updateCategories)

  app.delete("/ecomm/api/v1/deleteCategories",categoryController.deleteCategories)
}