const router = require("express").Router()
const multer = require('multer')
const path = require("path");

const middleware = require("../middlewares/index")
const blogController = require("../controllers/blog.controller")

const storage = multer.diskStorage({
    destination:"./uploads/",
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+'-'+Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

router.post("/",middleware.authMiddleware, upload.single('file'),blogController.save)
router.get("/",middleware.authMiddleware,blogController.findAll)
router.get("/:id",middleware.authMiddleware,blogController.findBlogById)
router.put("/:id",middleware.authMiddleware,blogController.updateBlogById)
router.delete("/:id",middleware.authMiddleware,blogController.deleteBlogById)
router.patch("/like/:id",middleware.authMiddleware,blogController.addLikeByBlogId)
router.patch("/dislike/:id",middleware.authMiddleware,blogController.addDisLikeByBlogId)


module.exports = router