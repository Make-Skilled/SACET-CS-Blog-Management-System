import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <>
      <style jsx>{`
        .nav-link {
          color: white !important;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--primary-red);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .navbar {
          background-color: var(--pure-black) !important;
        }

        .navbar.scrolled {
          background-color: var(--rich-black) !important;
          box-shadow: 0 2px 10px rgba(255, 0, 51, 0.1);
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-white" to="#">
            <span style={{ color: 'var(--primary-red)' }}>Blog</span> Manager
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-danger">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;