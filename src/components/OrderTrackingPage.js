
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import Header from './Header';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await orderService.trackOrder(orderId);
        setOrderData(data);
      } catch (error) {
        console.error('Error tracking order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrderData, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'on-route': return '🚗';
      case 'delivered': return '📦';
      default: return '⏳';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing Your Order';
      case 'on-route': return 'On the Way';
      case 'delivered': return 'Delivered';
      default: return 'Processing Order';
    }
  };

  const timelineSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: '✅' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'on-route', label: 'On the Way', icon: '🚗' },
    { key: 'delivered', label: 'Delivered', icon: '📦' }
  ];

  const getStepStatus = (step) => {
    const statusOrder = ['confirmed', 'preparing', 'on-route', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderData?.status);
    const stepIndex = statusOrder.indexOf(step);
    return stepIndex <= currentIndex;
  };

  if (loading) {
    return (
      <div className="order-tracking-page">
        <Header />
        <div className="loading-spinner">Loading order details...</div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="order-tracking-page">
        <Header />
        <div className="error-message">Order not found</div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <Header />
      
      <main className="tracking-content">
        <div className="tracking-header">
          <h1>Order #{orderId}</h1>
          <p>Track your order in real-time</p>
        </div>

        {/* Current Status */}
        <div className="status-card">
          <div className="status-icon">
            {getStatusIcon(orderData.status)}
          </div>
          <h2>{getStatusMessage(orderData.status)}</h2>
          <p>
            {orderData.status === 'delivered' 
              ? 'Your order has been delivered!' 
              : `Estimated delivery: ${new Date(orderData.estimatedDelivery).toLocaleTimeString()}`
            }
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="progress-timeline">
          {timelineSteps.map(step => (
            <div 
              key={step.key}
              className={`timeline-step ${getStepStatus(step.key) ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <span className="step-text">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Driver Info (when on-route) */}
        {orderData.status === 'on-route' && (
          <div className="driver-info">
            <h3>Your Delivery Partner</h3>
            <p>Your order is on the way! Our delivery partner will be there soon.</p>
            <div className="map-placeholder">
              <p>🗺️ Live Tracking</p>
              <small>Map integration coming soon</small>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="order-details">
          <h3>Order Details</h3>
          <div className="summary-item">
            <span>Order Total</span>
            <span>₦{orderData.total?.toLocaleString() || '0'}</span>
          </div>
          <div className="summary-item">
            <span>Order Time</span>
            <span>{new Date(orderData.createdAt || Date.now()).toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/food')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#00a082',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Order Again
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default OrderTrackingPage;
