import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchCourseById, enrollInCourse, checkEnrollment } from '../../services/api';
import './CourseDetail.css';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchCourseById(id)
      .then(data => setCourse(data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user && course) {
      checkEnrollment(user.id, course.id)
        .then(data => setEnrolled(data.enrolled))
        .catch(() => {});
    }
  }, [user, course]);

  const handleEnroll = async () => {
    if (!user) {
      setMessage('Please login to enroll.');
      return;
    }
    setEnrolling(true);
    try {
      await enrollInCourse(user.id, course.id);
      setEnrolled(true);
      setMessage('🎉 Successfully enrolled!');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < full ? 'filled' : 'empty'}`}>
          {i < full ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="cd-loading">
            <div className="spinner"></div>
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">😔</div>
            <h3>Course not found</h3>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        </div>
      </div>
    );
  }

  const instructor = course.instructor || {};

  return (
    <div className="course-detail-page" id="course-detail-page">
      {/* Header */}
      <section className="cd-header">
        <div className="cd-header-bg">
          <img src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200'} alt="" />
          <div className="cd-header-overlay"></div>
        </div>

        <div className="container cd-header-content">
          <div className="cd-header-text animate-fade-in-up">
            <div className="cd-breadcrumb">
              <Link to="/courses">Courses</Link> / <span>{course.category}</span>
            </div>
            <h1 className="cd-title">{course.title}</h1>
            <p className="cd-desc">{course.description}</p>

            <div className="cd-meta">
              <div className="cd-meta-item">
                <div className="star-rating">{renderStars(course.rating || 0)}</div>
                <span className="cd-rating-value">{course.rating?.toFixed(1)}</span>
              </div>
              <div className="cd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                {(course.totalStudents || 0).toLocaleString()} students
              </div>
              <div className="cd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {course.duration}
              </div>
              <div className="cd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                {course.totalLessons} lessons
              </div>
            </div>

            <div className="cd-instructor">
              <img
                src={instructor.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=instructor`}
                alt={instructor.fullName}
                className="cd-instructor-avatar"
              />
              <div>
                <span className="cd-instructor-label">Instructor</span>
                <span className="cd-instructor-name">{instructor.fullName || 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="cd-sidebar animate-fade-in-up delay-2">
            <div className="cd-enroll-card glass-card">
              <div className="cd-price">
                {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
              </div>

              {message && (
                <div className={`cd-message ${enrolled ? 'success' : 'info'}`}>
                  {message}
                </div>
              )}

              {enrolled ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg cd-enroll-btn" id="go-to-dashboard-btn">
                  Go to Dashboard
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-lg cd-enroll-btn"
                  onClick={handleEnroll}
                  disabled={enrolling}
                  id="enroll-btn"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="cd-includes">
                <h4>This course includes:</h4>
                <ul>
                  <li>📹 {course.duration} of video content</li>
                  <li>📝 {course.totalLessons} comprehensive lessons</li>
                  <li>📱 Access on mobile & desktop</li>
                  <li>🏆 Certificate of completion</li>
                  <li>♾️ Lifetime access</li>
                </ul>
              </div>

              <div className="cd-tags">
                <span className="badge badge-primary">{course.category}</span>
                <span className="badge badge-accent">{course.level}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="cd-curriculum section">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Course <span className="text-gradient">Curriculum</span></h2>
          <div className="curriculum-list animate-fade-in-up delay-1">
            {[
              { title: 'Getting Started & Setup', duration: '45 min', lessons: 5 },
              { title: 'Core Fundamentals', duration: '2.5 hours', lessons: 12 },
              { title: 'Building Real Projects', duration: '4 hours', lessons: 18 },
              { title: 'Advanced Techniques', duration: '3 hours', lessons: 15 },
              { title: 'Testing & Deployment', duration: '2 hours', lessons: 10 },
              { title: 'Final Project & Certification', duration: '5 hours', lessons: 8 },
            ].map((mod, i) => (
              <div key={i} className="curriculum-item glass-card">
                <div className="curriculum-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="curriculum-info">
                  <h4>{mod.title}</h4>
                  <span>{mod.lessons} lessons · {mod.duration}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
