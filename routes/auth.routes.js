const authcontroller = require('../controllers/auth.controller')
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody],authcontroller.signup)

    app.post("/ecomm/api/v1/auth/signin",authcontroller.signin)
}