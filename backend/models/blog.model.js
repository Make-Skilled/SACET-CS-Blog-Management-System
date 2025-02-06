const {Schema, model} = require('mongoose')

const blog = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    longDescription:{
        type:String,
        required:true
    },
    likes:{
        type:[Schema.Types.ObjectId],
        required:true
    },
    imageURI:{
        type:String,
        required:true
    }
},{timestamps:true})

const blogModel = model('blogs',blog)

module.exports = {
    blogModel 
}