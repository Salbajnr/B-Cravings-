
import React, { useState } from 'react';
import Header from './Header';

const OrderSummaryPage = () => {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Spaghetti Bolognese", quantity: 2, price: 10.99 },
    { id: 2, name: "Margherita Pizza", quantity: 1, price: 13.99 },
    { id: 3, name: "Tiramisu", quantity: 1, price: 6.50 }
  ]);

  const restaurant = "Mama's Italian Kitchen";
  const deliveryFee = 2.99;

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const removeItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setOrderItems([]);
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
          <h2>{restaurant}</h2>
          <p>Review your order before checking out.</p>
        </div>

        <section className="order-items-section">
          <div className="section-header">
            <h3>Your Items</h3>
            <button className="clear-all-btn" onClick={clearAll}>Clear All</button>
          </div>
          
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <img 
                  src={`https://images.unsplash.com/photo-${item.id === 1 ? '1621996346565-e3dbc353d2e5' : item.id === 2 ? '1513104890138-7c749659a591' : '1571877227200-a0d98ea607e9'}`} 
                  alt={item.name} 
                  className="item-image"
                />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>×{item.quantity} | ${item.price} each</p>
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
        </section>

        <section className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>

        <button className="checkout-btn">
          🛒 Checkout
        </button>
      </main>
    </div>
  );
};

export default OrderSummaryPage;
