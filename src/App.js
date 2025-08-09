
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <nav className="bottom-nav">
      <a href="/" className="nav-item active">
        <div className="nav-icon">🏠</div>
        <span>Home</span>
      </a>
      <a href="/food" className="nav-item">
        <div className="nav-icon">🍔</div>
        <span>Food</span>
      </a>
      <a href="/order-summary" className="nav-item">
        <div className="nav-icon">🛒</div>
        <span>Cart</span>
      </a>
      <a href="/login" className="nav-item">
        <div className="nav-icon">👤</div>
        <span>Profile</span>
      </a>
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
