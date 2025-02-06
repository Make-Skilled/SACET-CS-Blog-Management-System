const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require("./routes/auth.routes")
const blogRoutes = require("./routes/blog.routes")
const { default: mongoose } = require('mongoose')

const app = express()
const port = 80

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/uploads", express.static("uploads")); // http://localhost:80/uploads/filename

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/blogs", blogRoutes)


app.listen(port, () => {

    console.log(`blog app listening on port ${port}!`)
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Db Connected")
    })
    .catch(()=>{
        console.log("error while connecting to db")
    })
})