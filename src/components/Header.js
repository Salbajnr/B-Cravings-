
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isFood = false }) => {
  return (
    <header className={isFood ? "food_header" : ""}>
      <div className={isFood ? "logo logo2" : "logo"}>
        {isFood && (
          <button className="menu_btn">
            <i className="bx bx-menu-alt-left"></i>
          </button>
        )}
        <h2>
          Glovo<span><img src="./glovoimages/32x32.png" alt="" /></span>
        </h2>
      </div>
      <Link to="/login">Login</Link>
    </header>
  );
};

export default Header;
