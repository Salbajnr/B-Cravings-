
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/api';
import Header from './Header';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrderStatus();
      const interval = setInterval(loadOrderStatus, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const loadOrderStatus = async () => {
    try {
      const orderData = await orderService.trackOrder(orderId);
      setOrder(orderData);
      setLoading(false);
    } catch (error) {
      console.error('Error tracking order:', error);
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'confirmed', label: 'Order Confirmed', icon: '✅' },
      { key: 'preparing', label: 'Preparing Food', icon: '👨‍🍳' },
      { key: 'on-route', label: 'On the Way', icon: '🚗' },
      { key: 'delivered', label: 'Delivered', icon: '📦' }
    ];

    const currentIndex = steps.findIndex(step => step.key === order?.status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="order-tracking-page">
        <Header />
        <div className="loading-spinner">
          <div className="spinner">Loading order status...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-tracking-page">
        <Header />
        <div className="error-message">Order not found</div>
      </div>
    );
  }

  const statusSteps = getStatusSteps();
  const estimatedDelivery = new Date(order.estimatedDelivery).toLocaleTimeString();

  return (
    <div className="order-tracking-page">
      <Header />
      
      <main className="tracking-content">
        <div className="tracking-header">
          <h1>Order #{order.id}</h1>
          <p>Estimated delivery: {estimatedDelivery}</p>
        </div>

        <section className="status-timeline">
          <h2>Order Status</h2>
          <div className="timeline">
            {statusSteps.map((step, index) => (
              <div 
                key={step.key} 
                className={`timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-label">{step.label}</div>
                {index < statusSteps.length - 1 && (
                  <div className={`step-connector ${step.completed ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {order.status === 'on-route' && (
          <section className="driver-info">
            <h3>Your Driver is On the Way</h3>
            <div className="driver-details">
              <div className="driver-avatar">🚗</div>
              <div className="driver-info-text">
                <p><strong>Driver Location</strong></p>
                <p>Lat: {order.driverLocation?.lat.toFixed(4)}</p>
                <p>Lng: {order.driverLocation?.lng.toFixed(4)}</p>
              </div>
            </div>
          </section>
        )}

        {order.status === 'delivered' && (
          <section className="delivery-confirmation">
            <div className="success-message">
              <h2>🎉 Order Delivered Successfully!</h2>
              <p>Thank you for choosing Glovo!</p>
              <button className="rate-order-btn">Rate Your Order</button>
            </div>
          </section>
        )}

        <button className="refresh-status-btn" onClick={loadOrderStatus}>
          🔄 Refresh Status
        </button>
      </main>
    </div>
  );
};

export default OrderTrackingPage;
