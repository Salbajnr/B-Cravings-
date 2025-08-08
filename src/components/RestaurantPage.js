import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useApp } from './AppContext';
import * as restaurantService from './services/restaurantService';

const RestaurantPage = () => {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reviews = [
    { id: 1, name: "Sarah W.", review: "Excellent food, quick delivery!", rating: 5 },
    { id: 2, name: "Alex M.", review: "Loved the dishes and friendly staff.", rating: 4 },
    { id: 3, name: "Priya S.", review: "Great food and reasonable prices.", rating: 5 }
  ];

  useEffect(() => {
    loadRestaurantData();
  }, [id]);

  const loadRestaurantData = async () => {
    setLoading(true);
    try {
      // Get restaurant info
      const restaurants = await restaurantService.getRestaurants();
      const currentRestaurant = restaurants.find(r => r.id.toString() === id) || restaurants[0];
      setRestaurant(currentRestaurant);

      // Get menu
      const menu = await restaurantService.getRestaurantMenu(id);
      setMenuItems(menu);
    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, restaurantId: id } });
  };

  if (loading) {
    return (
      <div className="restaurant-page">
        <Header isRestaurant={true} />
        <div className="loading-spinner">
          <div className="spinner">Loading restaurant...</div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-page">
        <Header isRestaurant={true} />
        <div className="error-message">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <Header isRestaurant={true} />

      <main className="restaurant-content">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <div className="restaurant-info">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-logo" />
            <div className="restaurant-details">
              <h1>{restaurant.name}</h1>
              <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            </div>
            <div className="restaurant-actions">
              <button className="favorite-btn">♥</button>
              <button className="share-btn">⤴</button>
            </div>
          </div>

          <p className="restaurant-description">{restaurant.description}</p>

          {/* Restaurant Images */}
          <div className="restaurant-images">
            <div className="main-image">
              <img src={restaurant.image} alt="Restaurant" />
            </div>
            <div className="side-images">
              <img src={restaurant.images[1]} alt="Food" />
            </div>
            <div className="bottom-images">
              <img src={restaurant.images[2]} alt="Pepperoni Pizza" />
              <span className="image-label">Pepperoni Pizza</span>
            </div>
            <div className="bottom-images">
              <img src={restaurant.images[3]} alt="Pasta Carbonara" />
              <span className="image-label">Pasta Carbonara</span>
            </div>
          </div>

          <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Menu Section */}
        <section className="menu-section">
          <div className="section-header">
            <h2>Menu</h2>
            <button className="see-all-btn">See all</button>
          </div>

          <div className="menu-items">
            {menuItems.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <button 
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  🛒 Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Ratings & Reviews */}
        <section className="reviews-section">
          <div className="section-header">
            <h2>Ratings & Reviews</h2>
            <button className="add-review-btn">Add review</button>
          </div>

          <div className="rating-summary">
            <div className="rating-score">
              <span className="star">★</span>
              <span className="score">{restaurant.rating}</span>
            </div>
            <span className="rating-count">{restaurant.totalRatings} ratings</span>
          </div>

          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="reviewer-icon">👤</div>
                <div className="review-content">
                  <h4>{review.name}</h4>
                  <p>"{review.review}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {state.cart.length > 0 && (
        <div className="cart-preview">
          <span>{state.cart.length} items in cart</span>
          <button className="view-cart-btn">View Cart</button>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;