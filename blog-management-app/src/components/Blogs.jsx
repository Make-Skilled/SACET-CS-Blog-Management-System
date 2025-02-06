import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();

  // Updated IntersectionObserver to run when blogPosts changes (so it picks up new elements)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optionally unobserve after animation if you don't need further tracking
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all elements with the 'animate' class
    const elements = document.querySelectorAll('.animate');
    elements.forEach((el) => observer.observe(el));

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [blogPosts]);

  // Fetch blog posts from the API
  useEffect(() => {
    axios
      .get('http://localhost/api/v1/blogs/', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      })
      .then((res) => {
        setBlogPosts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
      });
  }, []);

  const gotoBlog = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const addLike = (id) => {
    axios
      .post(`http://127.0.0.1:80/like/${id}`, {}, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log('Like added', res.data);
        // Optionally update state or UI here based on response
      })
      .catch((err) => {
        console.error('Error liking blog:', err);
      });
  };

  return (
    <div className="overflow-hidden">
      <style jsx>{`
        :root {
          --primary-red: #ff0033;
          --rich-black: #121212;
          --pure-black: #000000;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate {
          opacity: 0;
        }
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .blog-card {
          transition: all 0.3s ease;
          background-color: var(--rich-black);
          border: 1px solid var(--primary-red);
        }
        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 15px rgba(255, 0, 51, 0.2);
        }
      `}</style>

      <header
        className="text-center py-5 text-white"
        style={{ marginTop: '76px', backgroundColor: 'var(--rich-black)' }}
      >
        <div className="container py-5">
          <h1 className="display-4 fw-bold animate">Our Blog</h1>
          <p className="lead animate" style={{ animationDelay: '0.2s' }}>
            Discover the latest insights and updates from our team
          </p>
        </div>
      </header>

      <section className="py-5" style={{ backgroundColor: 'var(--pure-black)' }}>
        <div className="container">
          <div className="row g-4">
            {blogPosts.length > 0 ? (
              blogPosts.map((post, index) => (
                <div className="col-lg-4 col-md-6" key={post._id}>
                  <div
                    className="blog-card h-100 animate rounded overflow-hidden"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <img
                      src={`http://localhost/uploads/${post.imageURI}`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="text-white-50 mb-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="h4 text-white mb-3">{post.title}</h3>
                      <p className="text-white-50 mb-4">{post.longDescription}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            gotoBlog(post._id);
                          }}
                        >
                          Read More
                        </button>
                        <button
                          className="btn btn-link p-0"
                          style={{ color: 'white' }}
                          onClick={addLike(post._id)}
                        >
                          <Heart className="transition-all duration-300 ease-in-out" fill="none" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-white">No blogs available.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
