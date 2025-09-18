
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

  const deliveryFee = 200;
  const serviceFee = Math.round(state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.05);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee + serviceFee;

  const paymentMethods = ['Card', 'Cash on Delivery'];

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
        serviceFee,
        total
      };

      const order = await orderService.createOrder(orderData);
      dispatch({ type: 'ADD_ORDER', payload: order });
      navigate(`/order-tracking/${order.id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="checkout-page">
        <Header />
        <div className="checkout-content">
          <h1>Your cart is empty</h1>
          <p>Please add items to your cart before checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      
      <main className="checkout-content">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <button className="help-btn">?</button>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <h3>Order Summary</h3>
          {state.cart.map((item, index) => (
            <div key={`${item.id}-${item.restaurantId}-${index}`} className="summary-item">
              <span>{item.quantity}x {item.name}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>₦{deliveryFee}</span>
          </div>
          <div className="summary-item">
            <span>Service Fee</span>
            <span>₦{serviceFee}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <h3>Payment Method</h3>
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
                <i className="card-icon">💳</i>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                />
                <i className="calendar-icon">📅</i>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                />
                <i className="lock-icon">🔒</i>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div className="delivery-section">
          <h3>Delivery Address</h3>
          <div className="address-input">
            <input
              type="text"
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <i className="location-icon">📍</i>
          </div>
        </div>

        <button 
          className="confirm-pay-btn"
          onClick={handleConfirmOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Confirm & Pay ₦${total.toLocaleString()}`}
        </button>
      </main>
    </div>
  );
};

export default CheckoutPage;
