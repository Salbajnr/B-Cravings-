
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from './Header';

const OrderSummaryPage = () => {
  const { state, dispatch } = useApp();

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id: itemId, quantity: newQuantity } 
      });
    }
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  if (state.cart.length === 0) {
    return (
      <div className="order-summary-page">
        <Header />
        <main className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to get started!</p>
          <Link to="/food" className="browse-btn">
            Browse Restaurants
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <Header />
      <main className="order-summary-main">
        <h1>Your Order</h1>
        
        <section className="cart-items">
          {state.cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">₦{item.price}</p>
              </div>
              
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{subtotal.toFixed(0)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>₦{deliveryFee.toFixed(0)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{total.toFixed(0)}</span>
          </div>
        </section>

        {state.cart.length > 0 && (
          <Link to="/checkout" className="checkout-btn">
            🛒 Checkout - ₦{total.toFixed(0)}
          </Link>
        )}
      </main>
    </div>
  );
};

export default OrderSummaryPage;
