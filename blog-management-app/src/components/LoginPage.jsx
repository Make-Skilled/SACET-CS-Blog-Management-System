import axios from 'axios';
import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (API request, validation, etc.)
    axios.post("http://localhost/api/v1/auth/login",{email,password})
    .then((res)=>{
      if(res.data.token){
          localStorage.setItem('token',res.data.token)
          alert('Login success')
          navigator('/blogs')
      }
      else{
        alert("login failed")
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

        .login-card {
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

        /* Add white color to the placeholder */
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

        .signup-link {
          color: var(--primary-red) !important;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .signup-link:hover {
          color: var(--accent-red) !important;
          text-decoration: underline;
        }

        .login-container {
          min-height: calc(100vh - 76px);
          margin-top: 76px;
          background-color: var(--pure-black);
        }
      `}</style>
      
      <div className="login-container d-flex justify-content-center align-items-center py-5">
        <div className="login-card p-4 p-md-5 rounded-3" style={{ maxWidth: '400px', width: '90%' }}>
          <h2 className="text-center text-white mb-4 fw-bold">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white-50">Email address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-white-50">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label text-white-50" htmlFor="remember">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
              Login
            </button>
            <div className="text-center">
              <Link to="/forgot-password" className="signup-link d-block mb-3">
                Forgot Password?
              </Link>
              <p className="text-white-50 mb-0">
                Don't have an account? {' '}
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
