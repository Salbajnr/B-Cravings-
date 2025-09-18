
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import './AuthStyles.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Mock API call - in real app, this would be your authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data (in real app, use proper auth storage)
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0]
      }));
      
      navigate('/');
      return; // Prevent state update after navigation
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'guest@bcravings.com',
      name: 'Guest User'
    }));
    navigate('/');
  };

  return (
    <div className="login-page">
      <Header />
      
      <main className="login-content">
        <div className="login-container">
          <div className="login-header">
            <img src="/bcravings-images/logo_auth.svg" alt="B-Cravings" className="login-logo" />
            <h1>Welcome back</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button onClick={handleGuestLogin} className="guest-btn">
            Continue as Guest
          </button>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
            <p><a href="#forgot" className="auth-link">Forgot password?</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="back-btn">
            <i className="bx bx-arrow-back"></i>
          </Link>
          <div className="logo">
            <h2>B-Cravings</h2>
          </div>
        </div>

        <div className="auth-content">
          <h1>Welcome back!</h1>
          <p>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="auth-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/signup"> Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
