
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
import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = ({ 
  id, 
  name, 
  cuisine, 
  rating, 
  deliveryTime, 
  deliveryFee, 
  image, 
  isPromoted = false,
  location = '',
  description = ''
}) => {
  return (
    <Link to={`/restaurant/${id}`} className="store-card">
      <div className="store-image">
        <img src={image} alt={name} loading="lazy" />
        {isPromoted && (
          <div className="promoted-badge">
            <span>⭐ Promoted</span>
          </div>
        )}
      </div>
      
      <div className="store-info">
        <h3 className="store-name">{name}</h3>
        <p className="store-cuisine">{cuisine}</p>
        {description && (
          <p className="store-description">{description}</p>
        )}
        {location && (
          <p className="store-location">📍 {location}</p>
        )}
        
        <div className="store-meta">
          <div className="rating">
            <span>⭐ {rating}</span>
          </div>
          <div className="delivery-info">
            <span className="delivery-time">🕒 {deliveryTime}</span>
            <span className="delivery-fee">{deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
