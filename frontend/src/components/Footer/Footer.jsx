import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#footer-logo-gradient)" />
                <path d="M8 14l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#a78bfa"/>
                  </linearGradient>
                </defs>
              </svg>
              <span>EduVerse</span>
            </Link>
            <p className="footer-tagline">Empowering learners worldwide with cutting-edge online education.</p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/courses">Browse Courses</Link>
            <Link to="/dashboard">Dashboard</Link>
            <a href="#features">Features</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduVerse LMS. Built with React, Node.js & Java Spring Boot.</p>
          <div className="footer-tech">
            <span className="badge badge-primary">React</span>
            <span className="badge badge-success">Node.js</span>
            <span className="badge badge-warning">Java</span>
            <span className="badge badge-accent">Spring Boot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
