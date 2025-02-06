import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/api/v1/blogs/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      })
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <img
          src={`http://localhost/uploads/${blog.imageURI}`}
          alt={blog.title}
          className="card-img"
        />
        <div className="card-body">
          <h1 className="card-title">{blog.title}</h1>
          <p className="card-description">{blog.description}</p>
          <p className="card-content">{blog.longDescription}</p>
          <ul className="card-details">
            <li>
              <strong>Likes:</strong> {blog.likes.length}
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          display: flex;
          justify-content: center;
        }
        .card {
          max-width: 600px;
          background-color: #121212;
          border: 1px solid #ff0033;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          color: #fff;
          margin-top: 20px;
          font-family: Arial, sans-serif;
        }
        .card-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .card-body {
          padding: 16px;
        }
        .card-title {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .card-description {
          font-size: 1.2rem;
          margin-bottom: 12px;
        }
        .card-content {
          font-size: 1rem;
          margin-bottom: 16px;
        }
        .card-details {
          list-style: none;
          padding: 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .card-details li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
