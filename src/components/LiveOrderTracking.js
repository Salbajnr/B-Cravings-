
import React, { useState, useEffect } from 'react';

const LiveOrderTracking = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });

  const statusSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: '✅' },
    { key: 'preparing', label: 'Preparing Food', icon: '👨‍🍳' },
    { key: 'ready', label: 'Ready for Pickup', icon: '📦' },
    { key: 'picked_up', label: 'Picked Up', icon: '🚗' },
    { key: 'on_the_way', label: 'On the Way', icon: '🛵' },
    { key: 'delivered', label: 'Delivered', icon: '🎉' }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const currentIndex = statusSteps.findIndex(step => step.key === orderStatus);
      if (currentIndex < statusSteps.length - 1) {
        setOrderStatus(statusSteps[currentIndex + 1].key);
        setEstimatedTime(prev => Math.max(0, prev - 5));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === orderStatus);
  };

  return (
    <div className="live-tracking">
      <div className="tracking-header">
        <h2>Order #{orderId}</h2>
        <p className="estimated-time">
          {estimatedTime > 0 ? `${estimatedTime} min remaining` : 'Delivered!'}
        </p>
      </div>

      <div className="progress-timeline">
        {statusSteps.map((step, index) => (
          <div key={step.key} className={`timeline-step ${
            index <= getCurrentStepIndex() ? 'completed' : ''
          } ${index === getCurrentStepIndex() ? 'active' : ''}`}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-text">{step.label}</div>
            {index < statusSteps.length - 1 && (
              <div className={`step-connector ${
                index < getCurrentStepIndex() ? 'completed' : ''
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {orderStatus === 'on_the_way' && (
        <div className="driver-info">
          <h3>🚗 Driver Location</h3>
          <p>Your driver is nearby and will arrive shortly!</p>
          <div className="map-placeholder">
            <p>📍 Live tracking map would be here</p>
            <small>Lat: {driverLocation.lat}, Lng: {driverLocation.lng}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrderTracking;
