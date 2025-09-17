
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import HomePage from './components/HomePage';
import FoodPage from './components/FoodPage';
import RestaurantPage from './components/RestaurantPage';
import OrderSummaryPage from './components/OrderSummaryPage';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import './index.css';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/cart" element={<OrderSummaryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
