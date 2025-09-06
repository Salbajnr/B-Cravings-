import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header = ({ isFood = false, isRestaurant = false }) => {
  const navigate = useNavigate();
  const { state } = useApp();

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`header ${isFood ? 'food_header' : ''}`}>
      <div className="logo logo2">
        {(isFood || isRestaurant) && (
          <button className="menu_btn" onClick={() => navigate(-1)}>
            <i className="bx bx-arrow-back"></i>
          </button>
        )}
        <Link to="/">
          <h2>
            B-Cravings<span><img src="/bcravings-images/32x32.png" alt="" /></span>
          </h2>
        </Link>
      </div>

      <div className="header-actions">
        {cartItemCount > 0 && (
          <Link to="/order-summary" className="cart-icon">
            🛒 <span className="cart-count">{cartItemCount}</span>
          </Link>
        )}
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </header>
  );
};

export default Header;