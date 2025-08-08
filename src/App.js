
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FoodPage from './components/FoodPage';
import RestaurantPage from './components/RestaurantPage';
import OrderSummaryPage from './components/OrderSummaryPage';
import CheckoutPage from './components/CheckoutPage';
import LoginPage from './components/LoginPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        
        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <a href="/" className="nav-item active">
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </a>
          <a href="/restaurant" className="nav-item">
            <span className="nav-icon">🍽️</span>
            <span>Restaurant</span>
          </a>
          <a href="/order-summary" className="nav-item">
            <span className="nav-icon">📋</span>
            <span>Order Summary</span>
          </a>
          <a href="/checkout" className="nav-item">
            <span className="nav-icon">💳</span>
            <span>Checkout</span>
          </a>
        </nav>
      </div>
    </Router>
  );
}

export default App;
