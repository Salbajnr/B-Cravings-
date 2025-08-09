
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from './Header';

const OrderSummaryPage = () => {
  const { state, dispatch } = useApp();
  
  const deliveryFee = 1500;
  const subtotal = state.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <div className="order-summary-page">
      <Header />
      
      <main className="order-content">
        <div className="order-header">
          <button className="menu-btn">☰</button>
          <h1>Order Summary</h1>
        </div>
        
        <div className="restaurant-info">
          <h2>Your Order</h2>
          <p>Review your order before checking out.</p>
        </div>

        <section className="order-items-section">
          <div className="section-header">
            <h3>Your Items ({state.cart.length})</h3>
            {state.cart.length > 0 && (
              <button className="clear-all-btn" onClick={clearAll}>Clear All</button>
            )}
          </div>
          
          {state.cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/food" className="browse-btn">Browse Restaurants</Link>
            </div>
          ) : (
            <div className="order-items">
              {state.cart.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.image || 'https://via.placeholder.com/80x80'} 
                    alt={item.name} 
                    className="item-image"
                  />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>₦{parseFloat(item.price).toFixed(0)} each</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
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
