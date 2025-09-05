
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
