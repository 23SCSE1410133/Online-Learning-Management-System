import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchEnrollmentsByUser } from '../../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }
    fetchEnrollmentsByUser(user.id)
      .then(data => setEnrollments(data))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return null;

  const totalProgress = enrollments.length > 0
    ? (enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length).toFixed(1)
    : 0;

  const completedCourses = enrollments.filter(e => e.progress >= 100).length;

  return (
    <div className="dashboard-page" id="dashboard-page">
      {/* Header */}
      <section className="dash-header">
        <div className="container">
          <div className="dash-header-content animate-fade-in-up">
            <div className="dash-header-left">
              <div className="dash-avatar">
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={user.fullName}
                />
              </div>
              <div className="dash-welcome">
                <h1>Welcome back, <span className="text-gradient">{user.fullName?.split(' ')[0]}</span>!</h1>
                <p>Continue your learning journey. You're doing great!</p>
              </div>
            </div>
            <Link to="/courses" className="btn btn-primary" id="dash-browse-btn">
              Browse More Courses
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dash-stats">
        <div className="container">
          <div className="dash-stats-grid">
            <div className="dash-stat-card glass-card animate-fade-in-up delay-1">
              <div className="dash-stat-icon enrolled">📚</div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">{enrollments.length}</span>
                <span className="dash-stat-label">Enrolled Courses</span>
              </div>
            </div>
            <div className="dash-stat-card glass-card animate-fade-in-up delay-2">
              <div className="dash-stat-icon progress-icon">📊</div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">{totalProgress}%</span>
                <span className="dash-stat-label">Avg Progress</span>
              </div>
            </div>
            <div className="dash-stat-card glass-card animate-fade-in-up delay-3">
              <div className="dash-stat-icon completed">🏆</div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">{completedCourses}</span>
                <span className="dash-stat-label">Completed</span>
              </div>
            </div>
            <div className="dash-stat-card glass-card animate-fade-in-up delay-4">
              <div className="dash-stat-icon streak">🔥</div>
              <div className="dash-stat-info">
                <span className="dash-stat-value">7</span>
                <span className="dash-stat-label">Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="dash-courses section">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">My <span className="text-gradient">Courses</span></h2>

          {loading ? (
            <div className="dash-loading">
              {[1,2,3].map(i => (
                <div key={i} className="skeleton-enrollment glass-card">
                  <div className="skeleton-img shimmer" style={{width: '120px', height: '100%'}}></div>
                  <div className="skeleton-body" style={{flex: 1}}>
                    <div className="skeleton-line shimmer" style={{width: '70%'}}></div>
                    <div className="skeleton-line shimmer" style={{width: '40%'}}></div>
                    <div className="skeleton-line shimmer" style={{width: '100%', height: '8px'}}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : enrollments.length > 0 ? (
            <div className="enrollment-list animate-fade-in-up delay-1">
              {enrollments.map((enrollment, i) => {
                const course = enrollment.course || {};
                const instructor = course.instructor || {};
                return (
                  <Link
                    key={enrollment.id}
                    to={`/courses/${course.id}`}
                    className="enrollment-card glass-card"
                    id={`enrollment-${enrollment.id}`}
                  >
                    <div className="enrollment-thumb">
                      <img
                        src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                        alt={course.title}
                      />
                    </div>

                    <div className="enrollment-info">
                      <div className="enrollment-top">
                        <h3>{course.title}</h3>
                        <span className="enrollment-instructor">by {instructor.fullName || 'Instructor'}</span>
                      </div>

                      <div className="enrollment-progress">
                        <div className="enrollment-progress-header">
                          <span className="enrollment-progress-label">Progress</span>
                          <span className="enrollment-progress-value">{(enrollment.progress || 0).toFixed(0)}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${enrollment.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="enrollment-bottom">
                        <div className="enrollment-tags">
                          <span className="badge badge-primary">{course.category}</span>
                          <span className="badge badge-accent">{course.level}</span>
                        </div>
                        <span className="enrollment-continue">
                          Continue Learning →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <div className="empty-icon">📭</div>
              <h3>No courses yet</h3>
              <p>You haven't enrolled in any courses. Start exploring!</p>
              <Link to="/courses" className="btn btn-primary" id="dash-empty-browse">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
