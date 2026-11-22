const express = require('express')

const authController = require("../controllers/auth.controller")

const router = express.Router()


/*POST /api/auth/Register */
router.post("/register",authController.userRegistercontroller)
    

/* POST /api/auth/login */
router.post("/login",authController.userLoginController)





module.exports = router