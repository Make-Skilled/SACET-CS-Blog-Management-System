import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImagePlus } from 'lucide-react';
import axios from 'axios';

const AddBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedContent: '',
    imageFile: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const naviagtor = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle blog post creation logic here (API request, validation, etc.)
    const form = new FormData()
    form.append('file',formData.imageFile)
    form.append('title',formData.title)
    form.append('description',formData.shortDescription)
    form.append('longDescription',formData.detailedContent)
    axios.post('http://localhost/api/v1/blogs/',form,{headers:{'x-auth-token':localStorage.getItem('token')}})
    .then((res)=>{
      if(res.status === 201){
          naviagtor("/blogs")
      }
    })
  };

  return (
    <div className="overflow-hidden">
      <style jsx>{`
        :root {
          --primary-red: #ff0033;
          --dark-red: #cc0033;
          --accent-red: #ff3333;
          --pure-black: #000000;
          --rich-black: #121212;
          --dark-gray: #1a1a1a;
        }

        .blog-form-card {
          transition: all 0.3s ease;
          background-color: var(--rich-black);
          border: 1px solid var(--primary-red);
          box-shadow: 0 4px 15px rgba(255, 0, 51, 0.1);
        }

        .form-control {
          background-color: var(--dark-gray);
          border: 1px solid var(--primary-red);
          color: white;
          transition: all 0.3s ease;
        }

        .form-control::placeholder {
          color: white !important;
        }

        .form-control:focus {
          background-color: var(--dark-gray);
          border-color: var(--accent-red);
          box-shadow: 0 0 0 0.25rem rgba(255, 0, 51, 0.25);
          color: white;
        }

        .btn-primary {
          background-color: var(--primary-red) !important;
          border-color: var(--primary-red) !important;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: var(--dark-red) !important;
          border-color: var(--dark-red) !important;
          transform: translateY(-2px);
        }

        .image-upload-area {
          border: 2px dashed var(--primary-red);
          background-color: var(--dark-gray);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .image-upload-area:hover {
          border-color: var(--accent-red);
          background-color: var(--rich-black);
        }

        .blog-form-container {
          min-height: calc(100vh - 76px);
          margin-top: 76px;
          background-color: var(--pure-black);
        }

        .preview-image {
          max-height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }
      `}</style>
      
      <div className="blog-form-container d-flex justify-content-center align-items-center py-5">
        <div className="blog-form-card p-4 p-md-5 rounded-3" style={{ maxWidth: '800px', width: '90%' }}>
          <h2 className="text-center text-white mb-4 fw-bold">Create New Blog Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label text-white-50">Blog Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title for your blog post"
                required
              />
              <small className="text-white-50">Make it catchy and descriptive (50-60 characters recommended)</small>
            </div>

            <div className="mb-4">
              <label htmlFor="shortDescription" className="form-label text-white-50">Short Description</label>
              <textarea
                className="form-control form-control-lg"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Write a brief summary of your blog post"
                rows="3"
                required
              />
              <small className="text-white-50">This will appear in blog previews (150-160 characters recommended)</small>
            </div>

            <div className="mb-4">
              <label htmlFor="detailedContent" className="form-label text-white-50">Detailed Content</label>
              <textarea
                className="form-control form-control-lg"
                id="detailedContent"
                name="detailedContent"
                value={formData.detailedContent}
                onChange={handleInputChange}
                placeholder="Write your full blog post content here"
                rows="10"
                required
              />
              <small className="text-white-50">Write your complete blog post with all details, formatting, and sections</small>
            </div>

            <div className="mb-4">
              <label className="form-label text-white-50">Featured Image</label>
              <input
                type="file"
                id="imageUpload"
                className="d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label 
                htmlFor="imageUpload" 
                className="image-upload-area d-flex flex-column align-items-center justify-content-center p-4 rounded w-100"
              >
                {formData.imagePreview ? (
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="preview-image w-100 mb-3"
                  />
                ) : (
                  <>
                    <ImagePlus size={48} className="mb-3" style={{ color: 'var(--primary-red)' }} />
                    <p className="text-white-50 mb-0">Click to upload featured image</p>
                  </>
                )}
              </label>
              <small className="text-white-50">Recommended size: 1200x630 pixels</small>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
              Publish Blog Post
            </button>

            <div className="text-center">
              <Link to="/blog" className="text-white-50">
                Cancel and return to blog
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;