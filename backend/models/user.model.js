const {Schema, model} = require('mongoose')

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tc:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

const userModel = model('users',user)

module.exports = {
    userModel
}