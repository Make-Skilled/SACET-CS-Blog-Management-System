import React, { useEffect } from 'react';
import { FaPen, FaChartLine, FaUserCircle, FaTools } from 'react-icons/fa';


const LandingPage = () => {
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

        .card {
          transition: all 0.3s ease;
          background-color: var(--rich-black);
          border: 1px solid var(--primary-red);
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 15px rgba(255, 0, 51, 0.2);
        }

        .feature-icon {
          transition: transform 0.3s ease;
          color: var(--primary-red) !important;
        }

        .card:hover .feature-icon {
          transform: scale(1.2);
        }

        .btn-primary {
          background-color: var(--primary-red) !important;
          border-color: var(--primary-red) !important;
        }

        .btn-primary:hover {
          background-color: var(--dark-red) !important;
          border-color: var(--dark-red) !important;
        }
      `}</style>

      <header className="text-center py-5 position-relative text-white" 
              style={{ marginTop: '76px', backgroundColor: 'var(--rich-black)' }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold animate">Welcome to Blog Manager</h1>
          <p className="lead animate" style={{ animationDelay: '0.2s' }}>
            Your all-in-one solution for managing blogs effortlessly
          </p>
          <button className="btn btn-primary btn-lg mt-3 animate" style={{ animationDelay: '0.4s' }}>
            Get Started
          </button>
        </div>
      </header>

      <section className="container-fluid py-5" style={{ backgroundColor: 'var(--pure-black)' }}>
        <h2 className="text-center mb-4 animate text-white">Key Features</h2>
        <div className="row text-center g-4">
          {[
            { icon: FaPen, title: 'Easy Blog Creation', delay: '0.2s' },
            { icon: FaChartLine, title: 'Analytics & Insights', delay: '0.4s' },
            { icon: FaUserCircle, title: 'User Management', delay: '0.6s' },
            { icon: FaTools, title: 'Customizable Tools', delay: '0.8s' }
          ].map((feature, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 animate" style={{ animationDelay: feature.delay }}>
                <div className="card-body">
                  <feature.icon size={40} className="mb-3 feature-icon" />
                  <h5 className="card-title text-white">{feature.title}</h5>
                  <p className="card-text text-white-50">Quickly create and manage your content with our intuitive tools.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: 'var(--dark-gray)' }}>
        <div className="container">
          <h2 className="text-center mb-4 animate text-white">Why Choose Us?</h2>
          <div className="row text-center g-4">
            {[
              { title: 'Efficient Management', delay: '0.2s' },
              { title: 'Scalable & Flexible', delay: '0.4s' },
              { title: 'Real-Time Collaboration', delay: '0.6s' }
            ].map((advantage, index) => (
              <div className="col-md-4 animate" key={index} style={{ animationDelay: advantage.delay }}>
                <div className="p-4 rounded shadow-sm h-100" 
                     style={{ backgroundColor: 'var(--rich-black)', border: '1px solid var(--primary-red)' }}>
                  <h4 className="text-white">{advantage.title}</h4>
                  <p className="mb-0 text-white-50">Experience the power of modern blog management tools.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;