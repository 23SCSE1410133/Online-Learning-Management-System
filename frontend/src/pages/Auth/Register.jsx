import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/api';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({
    username: '', fullName: '', email: '', password: '', role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await registerUser(form);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="register-page">
      <div className="auth-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="auth-card glass-card animate-fade-in-up">
        <div className="auth-header">
          <h1>Create your account</h1>
          <p>Start learning today — it's completely free</p>
        </div>

        {error && (
          <div className="auth-error animate-fade-in">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label className="input-label" htmlFor="reg-username">Username</label>
              <input id="reg-username" name="username" type="text" className="input-field" placeholder="johndoe" value={form.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="reg-fullname">Full Name</label>
              <input id="reg-fullname" name="fullName" type="text" className="input-field" placeholder="John Doe" value={form.fullName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-email">Email</label>
            <input id="reg-email" name="email" type="email" className="input-field" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" name="password" type="password" className="input-field" placeholder="••••••••" value={form.password} onChange={handleChange} required minLength="6" />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-role">I am a</label>
            <select id="reg-role" name="role" className="input-field" value={form.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading} id="register-submit">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
