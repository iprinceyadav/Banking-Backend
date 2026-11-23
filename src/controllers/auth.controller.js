const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

/**
 * - user Register controller
 * - POST /api/auth/register
 */

async function userRegistercontroller(req,res){
    const {email,name,password} = req.body

    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists){
        return res.status(422).json({
            message:"Email already exists",
            status: "failed"
        })
    }
    const user = await userModel.create({
        email,password,name
    })
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"2d"})

    res.cookie("token",token)

    res.send(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

/**
 * - User Login Controller 
 * POST  /api/auth /login
*/

async function userLoginController(req,res){
    const {email,password} =req.body

    const user = await userModel.findOne({email}).select("+password" )

    if(!user){
        return res.status(401).json({
            message:"Email or Password is Invalid"
        })
    }
    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or Password is INVLAID"
        })
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"2d"})

    res.cookie("token",token)
    res.send(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

module.exports = {
    userRegistercontroller,
    userLoginController
}