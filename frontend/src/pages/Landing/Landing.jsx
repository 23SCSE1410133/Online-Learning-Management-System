import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard/CourseCard';
import { fetchCourses } from '../../services/api';
import './Landing.css';

export default function Landing() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then(data => setCourses(data.slice(0, 4)))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { value: '50K+', label: 'Students', icon: '🎓' },
    { value: '200+', label: 'Courses', icon: '📚' },
    { value: '50+', label: 'Instructors', icon: '👨‍🏫' },
    { value: '4.8', label: 'Avg Rating', icon: '⭐' },
  ];

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14v7"/>
        </svg>
      ),
      title: 'Expert-Led Courses',
      desc: 'Learn from industry professionals with real-world experience in React, Java, Node.js and more.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
        </svg>
      ),
      title: 'Interactive Dashboard',
      desc: 'Track your progress, manage enrollments, and continue learning from where you left off.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: 'Full-Stack Tech',
      desc: 'Built with React, Node.js, Java Spring Boot — the exact tech stack you will master.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: 'Community Learning',
      desc: 'Join discussion forums, collaborate on projects, and grow with fellow learners.',
    },
  ];

  return (
    <div className="landing-page" id="landing-page">
      {/* ---- Hero ---- */}
      <section className="hero" id="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="hero-grid-pattern"></div>

        <div className="container hero-content">
          <div className="hero-text animate-fade-in-up">
            <span className="badge badge-primary hero-badge">🚀 #1 Learning Platform</span>
            <h1 className="hero-title">
              Master the <span className="text-gradient">Full Stack</span>
              <br />
              Build Your <span className="text-gradient-accent">Future</span>
            </h1>
            <p className="hero-subtitle">
              Learn React, Node.js, Java Spring Boot, and everything in between.
              Join thousands of students transforming their careers with hands-on, project-based courses.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary btn-lg" id="hero-explore-btn">
                Explore Courses
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg" id="hero-signup-btn">
                Sign Up Free
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-fade-in-up delay-2">
            <div className="hero-card-stack">
              <div className="hero-floating-card card-1">
                <div className="hfc-icon">⚛️</div>
                <span>React.js</span>
              </div>
              <div className="hero-floating-card card-2">
                <div className="hfc-icon">☕</div>
                <span>Java</span>
              </div>
              <div className="hero-floating-card card-3">
                <div className="hfc-icon">🟢</div>
                <span>Node.js</span>
              </div>
              <div className="hero-floating-card card-4">
                <div className="hfc-icon">🍃</div>
                <span>Spring Boot</span>
              </div>
              <div className="hero-floating-card card-5">
                <div className="hfc-icon">🐍</div>
                <span>Python</span>
              </div>
              <div className="hero-code-window">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <pre className="code-text">
{`const student = {
  name: "You",
  skills: ["React", "Java",
           "Node.js"],
  ready: true
};`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section className="stats-section" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className={`stat-card glass-card animate-fade-in-up delay-${i + 1}`}>
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Features ---- */}
      <section className="features-section section" id="features">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-accent">Why EduVerse?</span>
            <h2 className="section-title">Everything you need to <span className="text-gradient">succeed</span></h2>
            <p className="section-subtitle">Our platform is built by developers, for developers. Every feature is crafted to accelerate your learning journey.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card glass-card animate-fade-in-up delay-${i + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Featured Courses ---- */}
      <section className="featured-section section" id="featured-courses">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-primary">Top Picks</span>
            <h2 className="section-title">Featured <span className="text-gradient">Courses</span></h2>
            <p className="section-subtitle">Hand-picked courses to kickstart your full-stack development career.</p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1,2,3,4].map(i => (
                <div key={i} className="skeleton-card glass-card">
                  <div className="skeleton-img shimmer"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-line shimmer" style={{width:'80%'}}></div>
                    <div className="skeleton-line shimmer" style={{width:'50%'}}></div>
                    <div className="skeleton-line shimmer" style={{width:'60%'}}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}

          <div className="section-cta animate-fade-in-up">
            <Link to="/courses" className="btn btn-primary btn-lg" id="view-all-courses-btn">
              View All Courses
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="cta-section section" id="cta-section">
        <div className="container">
          <div className="cta-card animate-fade-in-up">
            <div className="cta-glow"></div>
            <h2>Ready to start your journey?</h2>
            <p>Join thousands of developers who are already learning with EduVerse. It's free to get started.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-accent btn-lg" id="cta-register-btn">
                Create Free Account
              </Link>
              <Link to="/courses" className="btn btn-secondary btn-lg" id="cta-browse-btn">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
