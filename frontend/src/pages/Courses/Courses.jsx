import { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard/CourseCard';
import { fetchCourses, searchCourses, fetchCoursesByCategory } from '../../services/api';
import './Courses.css';

const CATEGORIES = ['All', 'Web Development', 'Backend Development', 'Data Science', 'Computer Science', 'Database'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');

  useEffect(() => {
    fetchCourses()
      .then(data => {
        setCourses(data);
        setFiltered(data);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...courses];
    if (activeCategory !== 'All') {
      result = result.filter(c => c.category === activeCategory);
    }
    if (activeLevel !== 'All') {
      result = result.filter(c => c.level === activeLevel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, activeLevel, searchQuery, courses]);

  return (
    <div className="courses-page" id="courses-page">
      <section className="courses-hero">
        <div className="container">
          <div className="courses-hero-content animate-fade-in-up">
            <h1 className="courses-hero-title">
              Explore Our <span className="text-gradient">Courses</span>
            </h1>
            <p className="courses-hero-subtitle">
              Discover {courses.length}+ courses designed to take you from beginner to expert.
            </p>

            <div className="search-bar" id="course-search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="course-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="courses-content section">
        <div className="container">
          <div className="filters-bar animate-fade-in-up delay-1">
            <div className="filter-group">
              <span className="filter-label">Category:</span>
              <div className="filter-chips">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Level:</span>
              <div className="filter-chips">
                {LEVELS.map(level => (
                  <button
                    key={level}
                    className={`filter-chip ${activeLevel === level ? 'active' : ''}`}
                    onClick={() => setActiveLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="courses-results-count">
            <p>{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
          </div>

          {loading ? (
            <div className="courses-grid-page">
              {[1,2,3,4,5,6].map(i => (
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
          ) : filtered.length > 0 ? (
            <div className="courses-grid-page">
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <div className="empty-icon">🔍</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-secondary" onClick={() => { setActiveCategory('All'); setActiveLevel('All'); setSearchQuery(''); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
