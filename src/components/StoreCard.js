
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoreCard = ({ 
  id, 
  name, 
  rating, 
  image, 
  cuisine, 
  deliveryTime = '20-30 min',
  deliveryFee = '$2.99',
  discount,
  isPromoted = false 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`, { 
      state: { 
        restaurantData: { id, name, rating, image, cuisine, deliveryTime, deliveryFee } 
      } 
    });
  };

  return (
    <div className={`store-card ${isPromoted ? 'promoted' : ''}`} onClick={handleClick}>
      <div className="store-image">
        <img src={image} alt={name} loading="lazy" />
        {discount && <span className="discount-badge">{discount}</span>}
        {isPromoted && <span className="promoted-badge">Promoted</span>}
      </div>
      
      <div className="store-info">
        <h3 className="store-name">{name}</h3>
        <p className="store-cuisine">{cuisine}</p>
        
        <div className="store-details">
          <div className="rating">
            <span className="star">★</span>
            <span>{rating}</span>
          </div>
          <span className="delivery-time">{deliveryTime}</span>
          <span className="delivery-fee">{deliveryFee}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
