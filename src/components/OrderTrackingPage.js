
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/api';
import Header from './Header';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderStatus();
    const interval = setInterval(loadOrderStatus, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  const loadOrderStatus = async () => {
    try {
      const orderData = await orderService.trackOrder(orderId);
      setOrder(orderData);
    } catch (error) {
      console.error('Failed to load order:', error);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'on-route': return '🚗';
      case 'delivered': return '🎉';
      default: return '📋';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'confirmed': return 'Order confirmed! Restaurant is preparing your food.';
      case 'preparing': return 'Your delicious meal is being prepared with love!';
      case 'on-route': return 'Driver is on the way to deliver your order!';
      case 'delivered': return 'Order delivered successfully! Enjoy your meal!';
      default: return 'Processing your order...';
    }
  };

  if (loading) {
    return (
      <div className="order-tracking-page">
        <Header />
        <div className="loading-spinner">Loading order status...</div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <Header />
      
      <main className="tracking-content">
        <div className="tracking-header">
          <h1>Order Tracking</h1>
          <p>Order #{orderId}</p>
        </div>

        <div className="status-card">
          <div className="status-icon">
            {getStatusIcon(order?.status)}
          </div>
          <h2>{getStatusMessage(order?.status)}</h2>
          {order?.estimatedDelivery && (
            <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleTimeString()}</p>
          )}
        </div>

        <div className="progress-timeline">
          <div className={`timeline-step ${['confirmed', 'preparing', 'on-route', 'delivered'].includes(order?.status) ? 'completed' : ''}`}>
            <div className="step-icon">✅</div>
            <div className="step-text">Order Confirmed</div>
          </div>
          <div className={`timeline-step ${['preparing', 'on-route', 'delivered'].includes(order?.status) ? 'completed' : ''}`}>
            <div className="step-icon">👨‍🍳</div>
            <div className="step-text">Preparing</div>
          </div>
          <div className={`timeline-step ${['on-route', 'delivered'].includes(order?.status) ? 'completed' : ''}`}>
            <div className="step-icon">🚗</div>
            <div className="step-text">On Route</div>
          </div>
          <div className={`timeline-step ${order?.status === 'delivered' ? 'completed' : ''}`}>
            <div className="step-icon">🎉</div>
            <div className="step-text">Delivered</div>
          </div>
        </div>

        {order?.driverLocation && order?.status === 'on-route' && (
          <div className="driver-info">
            <h3>🚗 Driver Location</h3>
            <p>Your driver is nearby and will arrive shortly!</p>
            <div className="map-placeholder">
              <p>📍 Live tracking map would be here</p>
              <small>Lat: {order.driverLocation.lat}, Lng: {order.driverLocation.lng}</small>
            </div>
          </div>
        )}

        <div className="order-details">
          <h3>Order Summary</h3>
          <p>Total: ₦{order?.total?.toFixed(0) || '0'}</p>
        </div>
      </main>
    </div>
  );
};

export default OrderTrackingPage;
