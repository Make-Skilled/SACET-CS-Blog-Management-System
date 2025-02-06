import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white text-center py-4" style={{ backgroundColor: 'var(--pure-black)' }}>
      <div className="container">
        <p className="mb-2">&copy; 2025 Blog Manager. All rights reserved.</p>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a href="#" className="text-white text-decoration-none hover-underline">Privacy Policy</a>
          </li>
          <li className="list-inline-item mx-3">|</li>
          <li className="list-inline-item">
            <a href="#" className="text-white text-decoration-none hover-underline">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;