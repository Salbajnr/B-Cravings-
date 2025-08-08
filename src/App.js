
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './components/HomePage';
import FoodPage from './components/FoodPage';
import RestaurantPage from './components/RestaurantPage';
import OrderSummaryPage from './components/OrderSummaryPage';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import LoginPage from './components/LoginPage';
import './index.css';

const BottomNavigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <span className="nav-icon">🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/food" className={`nav-item ${location.pathname === '/food' ? 'active' : ''}`}>
        <span className="nav-icon">🍽️</span>
        <span>Food</span>
      </Link>
      <Link to="/order-summary" className={`nav-item ${location.pathname === '/order-summary' ? 'active' : ''}`}>
        <span className="nav-icon">📋</span>
        <span>Orders</span>
      </Link>
      <Link to="/login" className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
        <span className="nav-icon">👤</span>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/restaurant/:id?" element={<RestaurantPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          
          <BottomNavigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
