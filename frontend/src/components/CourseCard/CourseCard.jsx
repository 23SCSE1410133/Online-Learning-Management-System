import { Link } from 'react-router-dom';
import './CourseCard.css';

export default function CourseCard({ course, index = 0 }) {
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) stars.push(<span key={i} className="star filled">★</span>);
      else if (i === full && half) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star empty">☆</span>);
    }
    return stars;
  };

  const instructorName = course.instructor?.fullName || 'Unknown Instructor';

  return (
    <Link
      to={`/courses/${course.id}`}
      className={`course-card glass-card animate-fade-in-up delay-${(index % 6) + 1}`}
      id={`course-card-${course.id}`}
    >
      <div className="course-card-image">
        <img
          src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
          alt={course.title}
          loading="lazy"
        />
        <div className="course-card-overlay">
          <span className="badge badge-primary">{course.category}</span>
        </div>
        {course.price && (
          <div className="course-card-price">
            ${course.price.toFixed(2)}
          </div>
        )}
      </div>

      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-instructor">by {instructorName}</p>

        <div className="course-card-meta">
          <div className="course-card-rating">
            <div className="star-rating">{renderStars(course.rating || 0)}</div>
            <span className="rating-value">{course.rating?.toFixed(1) || '—'}</span>
          </div>
          <span className="course-card-students">
            {(course.totalStudents || 0).toLocaleString()} students
          </span>
        </div>

        <div className="course-card-footer">
          <span className="course-card-level badge badge-accent">{course.level}</span>
          <span className="course-card-duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {course.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
