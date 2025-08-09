
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { orderService } from '../services/api';
import Header from './Header';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 1500;
  const subtotal = state.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const paymentMethods = ['Card', 'Apple Pay', 'PayPal', 'Cash'];

  const handleConfirmOrder = async () => {
    if (state.cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    if (paymentMethod === 'Card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please fill in all card details');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        items: state.cart,
        paymentMethod,
        deliveryAddress,
        subtotal,
        deliveryFee,
        total
      };

      const order = await orderService.createOrder(orderData);
      dispatch({ type: 'SET_CURRENT_ORDER', payload: order });
      dispatch({ type: 'CLEAR_CART' });
      
      // Navigate to order tracking
      navigate(`/order-tracking/${order.id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
          {state.cart.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name} ×{item.quantity}</span>
              <span>₦{(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
            </div>
          ))}
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>₦{deliveryFee.toFixed(0)}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₦{total.toFixed(0)}</span>
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
            <input 
              type="text" 
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <span className="location-icon">📍</span>
          </div>
        </section>

        <button 
          className="confirm-pay-btn"
          onClick={handleConfirmOrder}
          disabled={isProcessing || state.cart.length === 0}
        >
          {isProcessing ? 'Processing...' : `✓ Confirm & Pay ₦${total.toFixed(0)}`}
        </button>
      </main>
    </div>
  );
};

export default CheckoutPage;
