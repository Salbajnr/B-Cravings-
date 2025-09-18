
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <Link to="/">
        <img src="/bcravings-images/b-cravings-white.svg" alt="B-Cravings" />
      </Link>
      
      <div className="lets">
        <h3>Let's do it together</h3>
        <div className="lets_links">
          <a href="#careers">Careers</a>
          <a href="#partners">B-Cravings for Partners</a>
          <a href="#couriers">Couriers</a>
          <a href="#business">B-Cravings Business</a>
        </div>
      </div>
      
      <div className="lets">
        <h3>Links of interest</h3>
        <div className="lets_links">
          <a href="#about">About us</a>
          <a href="#faq">FAQ</a>
          <a href="#prime">B-Cravings Prime</a>
          <a href="#security">Security</a>
        </div>
      </div>
      
      <div className="lets">
        <h3>Follow us</h3>
        <div className="lets_links">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </div>

      <div className="footer_btns">
        <button className="download">
          <img src="/bcravings-images/download-button-new (1).svg" alt="Download" />
        </button>
        <button className="download">
          <img src="/bcravings-images/download-button-new.svg" alt="Download" />
        </button>
      </div>
      
      <div className="last_links">
        <a href="#terms">Terms & Conditions</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#cookies">Cookies Policy</a>
        <a href="#compliance">Compliance</a>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#333',
      color: 'white',
      padding: '2rem 1rem',
      marginTop: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: '#00a082', marginBottom: '1rem' }}>B-Cravings</h3>
            <p>Your favorite food delivery service in Bauchi, Nigeria.</p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/food" style={{ color: '#ccc', textDecoration: 'none' }}>Browse Food</a>
              <a href="/login" style={{ color: '#ccc', textDecoration: 'none' }}>Sign In</a>
              <a href="/signup" style={{ color: '#ccc', textDecoration: 'none' }}>Sign Up</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <p>📞 +234 123 456 7890</p>
            <p>📧 info@bcravings.com</p>
            <p>📍 Bauchi, Nigeria</p>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #555', 
          paddingTop: '1rem',
          color: '#999'
        }}>
          <p>&copy; 2024 B-Cravings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
