import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Blog() {
    let {id} = useParams()
    const [blog, setBlog] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost/api/v1/blogs/${id}`,{headers:{'x-auth-token':localStorage.getItem('token')}})
        .then((res)=>{
            setBlog(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[id])
  return (
    <div>
      Single blog
      {JSON.stringify(blog)}
    </div>
  )
}
