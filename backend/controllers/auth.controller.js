const { userModel } = require("../models/user.model")
const jwt = require('jsonwebtoken')


async function save(req, res) {
    try{

        const{name, email,password,tc } = req.body;

        let user = await userModel.findOne({email})
        if(user)
            return res.status(200).json({message:"user already registered with this email"})

        let doc = new userModel({name,email,password,tc})
        await doc.save();
        return res.status(201).json({message:"registration success"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function login(req,res) {

    try{
        const {email, password} = req.body
        let user = await userModel.findOne({email,password})

        if(user){
            const payload = {
                user:{
                    id:user._id
                }
            }
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"10h"})
            return res.status(200).json({token})

        }

        return res.status(204).json({message:"Bad credentials"})

    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
    
}

module.exports = {
    save,
    login
}