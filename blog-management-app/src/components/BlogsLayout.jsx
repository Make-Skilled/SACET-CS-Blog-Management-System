import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function BlogsLayout() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="blogs-layout overflow-hidden">
      <style jsx>{`
        :root {
          --primary-red: #ff0033;
          --dark-red: #cc0033;
          --accent-red: #ff3333;
          --pure-black: #000000;
          --rich-black: #121212;
          --dark-gray: #1a1a1a;
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

        .blogs-layout {
          background-color: var(--pure-black);
          min-height: calc(100vh - 76px);
          margin-top: 76px;
          padding: 2rem 0;
        }

        .content-wrapper {
          background-color: var(--rich-black);
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(255, 0, 51, 0.1);
        }
      `}</style>

      <div className="container">
        <div className="content-wrapper animate">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
