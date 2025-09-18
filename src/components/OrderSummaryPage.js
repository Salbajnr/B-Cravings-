
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from './Header';

const OrderSummaryPage = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const updateQuantity = (itemId, restaurantId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ 
        type: 'REMOVE_FROM_CART', 
        payload: { id: itemId, restaurantId } 
      });
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id: itemId, restaurantId, quantity: newQuantity } 
      });
    }
  };

  const removeItem = (itemId, restaurantId) => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: { id: itemId, restaurantId } 
    });
  };

  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 200;
  const serviceFee = Math.round(calculateSubtotal() * 0.05);
  const total = calculateSubtotal() + deliveryFee + serviceFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (state.cart.length === 0) {
    return (
      <div className="order-summary-page">
        <Header />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from our restaurants!</p>
          <Link to="/food" className="browse-btn">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <Header />
      
      <main className="order-summary-main">
        <h1>Order Summary</h1>
        
        <div className="cart-items">
          {state.cart.map((item, index) => (
            <div key={`${item.id}-${item.restaurantId}-${index}`} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">₦{item.price.toLocaleString()}</p>
                <small>From {item.restaurantName || 'Restaurant'}</small>
              </div>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity + 1)}>
                  +
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id, item.restaurantId)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{calculateSubtotal().toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₦{deliveryFee}</span>
          </div>
          <div className="summary-row">
            <span>Service Fee</span>
            <span>₦{serviceFee}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>

        <Link to="/food" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </main>
    </div>
  );
};

export default OrderSummaryPage;
