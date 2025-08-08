
import React, { useState } from 'react';
import Header from './Header';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const orderSummary = {
    items: [
      { name: "Chicken Shawarma Wrap", quantity: 2, price: 8.50 },
      { name: "Spicy Fries", quantity: 1, price: 3.00 },
      { name: "Soft Drink", quantity: 1, price: 2.50 }
    ],
    deliveryFee: 2.99
  };

  const subtotal = orderSummary.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + orderSummary.deliveryFee;

  const paymentMethods = ['Card', 'Apple Pay', 'PayPal', 'Cash'];

  return (
    <div className="checkout-page">
      <Header />
      
      <main className="checkout-content">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <button className="help-btn">?</button>
        </div>

        <section className="order-summary-section">
          <h3>ORDER SUMMARY</h3>
          {orderSummary.items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)} ×{item.quantity}</span>
            </div>
          ))}
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>${orderSummary.deliveryFee}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>

        <section className="payment-section">
          <h3>PAYMENT METHOD</h3>
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <button 
                key={method}
                className={`payment-method ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>

          {paymentMethod === 'Card' && (
            <div className="card-details">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                />
                <span className="card-icon">💳</span>
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Expiry Date (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                />
                <span className="calendar-icon">📅</span>
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                />
                <span className="lock-icon">🔒</span>
              </div>
            </div>
          )}
        </section>

        <section className="delivery-section">
          <h3>DELIVERY ADDRESS</h3>
          <div className="address-input">
            <input type="text" placeholder="Enter your delivery address" />
            <span className="location-icon">📍</span>
          </div>
        </section>

        <button className="confirm-pay-btn">
          ✓ Confirm & Pay
        </button>
      </main>
    </div>
  );
};

export default CheckoutPage;
