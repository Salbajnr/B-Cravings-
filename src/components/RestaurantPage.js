
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantService } from '../services/api';
import { useApp } from '../context/AppContext';
import Header from './Header';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadRestaurantData();
  }, [id]);

  const loadRestaurantData = async () => {
    try {
      setLoading(true);
      const [restaurantData, menuData] = await Promise.all([
        restaurantService.getRestaurantById(id),
        restaurantService.getRestaurantMenu(id)
      ]);
      setRestaurant(restaurantData);
      setMenuItems(menuData);
    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      restaurantId: parseInt(id),
      restaurantName: restaurant?.name
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const getFilteredItems = () => {
    if (selectedCategory === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  };

  const getCategories = () => {
    const categories = ['All', ...new Set(menuItems.map(item => item.category))];
    return categories;
  };

  const getCartItemCount = (itemId) => {
    const cartItem = state.cart.find(item => 
      item.id === itemId && item.restaurantId === parseInt(id)
    );
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-spinner">Loading restaurant details...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div>
        <Header />
        <div className="error-message">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <Header />
      
      <main className="restaurant-content">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <div className="restaurant-image">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-status">
              {restaurant.isOpen ? (
                <span className="open-badge">🟢 Open</span>
              ) : (
                <span className="closed-badge">🔴 Closed</span>
              )}
            </div>
          </div>
          
          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p className="cuisine">{restaurant.cuisine} • {restaurant.location}</p>
            <p className="description">{restaurant.description}</p>
            
            <div className="restaurant-stats">
              <div className="stat">
                <span className="stat-value">⭐ {restaurant.rating}</span>
                <span className="stat-label">({restaurant.totalRatings} reviews)</span>
              </div>
              <div className="stat">
                <span className="stat-value">🕒 {restaurant.deliveryTime}</span>
                <span className="stat-label">Delivery</span>
              </div>
              <div className="stat">
                <span className="stat-value">{restaurant.deliveryFee}</span>
                <span className="stat-label">Delivery fee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="menu-categories">
          {getCategories().map(category => (
            <button
              key={category}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="menu-section">
          <h2>Menu</h2>
          
          {getFilteredItems().length === 0 ? (
            <div className="no-items">
              <p>No items available in this category</p>
            </div>
          ) : (
            <div className="menu-items">
              {getFilteredItems().map(item => {
                const cartCount = getCartItemCount(item.id);
                return (
                  <div key={item.id} className="menu-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-footer">
                        <span className="item-price">₦{item.price.toLocaleString()}</span>
                        
                        <div className="add-to-cart">
                          {cartCount > 0 ? (
                            <div className="quantity-control">
                              <button 
                                onClick={() => dispatch({
                                  type: 'UPDATE_CART_QUANTITY',
                                  payload: { id: item.id, restaurantId: parseInt(id), quantity: cartCount - 1 }
                                })}
                              >
                                −
                              </button>
                              <span>{cartCount}</span>
                              <button onClick={() => addToCart(item)}>+</button>
                            </div>
                          ) : (
                            <button 
                              className="add-btn"
                              onClick={() => addToCart(item)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {state.cart.length > 0 && (
          <div className="cart-summary">
            <div className="cart-info">
              <span>{state.cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart</span>
              <span>₦{state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
            </div>
            <button 
              className="view-cart-btn"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantPage;
