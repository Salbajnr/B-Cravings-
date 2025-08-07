
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Link to="/">
        <img src="./glovoimages/glovo-white.svg" alt="" />
      </Link>
      <div className="lets">
        <h3>Let's do it together</h3>
        <div className="lets_links">
          <a href="">Careers</a>
          <a href="">Glovo for Partners</a>
          <a href="">Couriers</a>
          <a href="">Glovo Business</a>
        </div>
      </div>
      <div className="lets">
        <h3>Links of interest</h3>
        <div className="lets_links">
          <a href="">About us</a>
          <a href="">FAQ</a>
          <a href="">Glovo Prime</a>
          <a href="">Security</a>
        </div>
      </div>
      <div className="lets">
        <h3>Follow us</h3>
        <div className="lets_links">
          <a href="">Facebook</a>
          <a href="">Twitter</a>
          <a href="">Instagram</a>
        </div>
      </div>
      <div className="footer_btns">
        <button className="download">
          <img src="./glovoimages/download-button-new (1).svg" alt="" />
        </button>
        <button className="download">
          <img src="./glovoimages/download-button-new.svg" alt="" />
        </button>
      </div>
      <div className="last_links">
        <a href="">terms & conditions</a>
        <a href="">privacy policy</a>
        <a href="">cookies policy</a>
        <a href="">compliance</a>
      </div>
    </footer>
  );
};

export default Footer;
