const { blogModel } = require("../models/blog.model")

async function save(req,res) {
    try{
        const {title, description, longDescription} = req.body
        if(!req.file){
            return res.status(200).json({message:"file not uploaded please try again"})
        }
        let doc = new blogModel({
            author:req.user.id,
            title,description,longDescription,likes:[],
            imageURI:req.file.filename
        })

        await doc.save()

        return res.status(201).json({message:"Blog created"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function findAll(req,res) {
    try{
        return res.status(200).json(await blogModel.find({}))
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
    
}

async function findBlogById(req,res) {
    try{
        let id = req.params.id
        let blog = await blogModel.findById(id)
        if(blog)
            return res.status(200).json(blog)
        return res.status(204).json({message:"Blog Not Found"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function deleteBlogById(req,res) {
    try{
        let id = req.params.id
        let blog = await blogModel.findById(id)
        if(!blog || blog.author !== req.user.id)
            return res.status(403).json({message:"You don't have permission to delete thi blog / blog not found with this id"})
        await blogModel.findByIdAndDelete(id)
        return res.status(200).json({message:"Blog deleted"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function updateBlogById(req,res) {
    try{
        let id  = req.params.id
        let blog = await blogModel.findById(id)

        if(!blog || blog.author !== req.user.id)
            return res.status(403).json({message:"You don't have permission to update this blog / blog not found with this id"})

        const {title, description, longDescription} = req.body

        await blogModel.findByIdAndUpdate(id,{$set:{title,description,longDescription}})
        return res.status(200).json({message:"Blog updated"})

    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function addLikeByBlogId(req,res) {
    try{
        let id = req.params.id
        await blogModel.findByIdAndUpdate(id,{$addToSet:{likes:req.user.id}})
        return res.status(204).json({message:"Liked the post"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

async function addDisLikeByBlogId(req,res) {
    try{
        let id = req.params.id
        await blogModel.findByIdAndUpdate(id,{$pull:{likes:req.user.id}})
        return res.status(204).json({message:"Liked the post"})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }
}

module.exports = {
    save,
    findAll,
    findBlogById,
    updateBlogById,
    deleteBlogById,
    addLikeByBlogId,
    addDisLikeByBlogId
}