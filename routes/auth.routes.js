const authcontroller = require('../controllers/auth.controller')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",authcontroller.signup)
}