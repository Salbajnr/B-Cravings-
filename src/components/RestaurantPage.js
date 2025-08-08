
import React, { useState } from 'react';
import Header from './Header';

const RestaurantPage = () => {
  const [cart, setCart] = useState([]);

  const restaurant = {
    name: "Pizza Palace",
    cuisine: "Italian • Pizza • $$",
    description: "Authentic Italian pizzas made with fresh ingredients. Cozy atmosphere and fast delivery.",
    rating: 4.7,
    totalRatings: 345,
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f"
    ]
  };

  const menuItems = [
    { id: 1, name: "Margherita Pizza", description: "Fresh tomato, mozzarella, basil", price: 13.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 2, name: "Pasta Carbonara", description: "Creamy sauce, pancetta, parmesan", price: 15.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5" },
    { id: 3, name: "Caesar Salad", description: "Romaine, parmesan, croutons", price: 9.99, image: "https://images.unsplash.com/photo-1512852939750-1305098529bf" },
    { id: 4, name: "Tiramisu", description: "Espresso, mascarpone, cocoa", price: 6.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9" }
  ];

  const reviews = [
    { id: 1, name: "Sarah W.", review: "Excellent pizza, quick delivery!", rating: 5 },
    { id: 2, name: "Alex M.", review: "Loved the pasta and friendly staff.", rating: 4 },
    { id: 3, name: "Priya S.", review: "Great food and reasonable prices.", rating: 5 }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="restaurant-page">
      <Header isRestaurant={true} />
      
      <main className="restaurant-content">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <div className="restaurant-info">
            <img src={restaurant.images[0]} alt={restaurant.name} className="restaurant-logo" />
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
              <img src={restaurant.images[0]} alt="Restaurant" />
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

      {cart.length > 0 && (
        <div className="cart-preview">
          <span>{cart.length} items in cart</span>
          <button className="view-cart-btn">View Cart</button>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
