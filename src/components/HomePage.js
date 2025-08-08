
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  const currentDeals = [
    { 
      id: 1, 
      title: "Burger House", 
      rating: 4.5, 
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      tag: "Fast Food",
      discount: "30% OFF"
    },
    { 
      id: 2, 
      title: "Pizza Palace", 
      rating: 4.7, 
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      tag: "Pizza"
    }
  ];

  const popularRestaurants = [
    { id: 1, name: "Burger House", rating: 4.5, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add" },
    { id: 2, name: "Pizza Palace", rating: 4.7, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 3, name: "Sushi Master", rating: 4.6, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351" },
    { id: 4, name: "Taco Bell", rating: 4.3, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b" }
  ];

  const featuredCuisines = [
    { name: "Burgers", color: "#4A90E2", icon: "🍔" },
    { name: "Pizza", color: "#7ED321", icon: "🍕" },
    { name: "Sushi", color: "#F5A623", icon: "🍱" }
  ];

  const featuredOffers = [
    {
      id: 1,
      title: "Burger Combo",
      subtitle: "Only $5.99 • Today only",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      buttonText: "Order"
    },
    {
      id: 2,
      title: "2-for-1 Pizza",
      subtitle: "On all Margherita pizzas",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      buttonText: "Order"
    }
  ];

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {/* Current Deals Section */}
        <section className="deals-section">
          <div className="section-header">
            <h2>Current Deals</h2>
            <button className="view-all-btn">View all</button>
          </div>
          
          <div className="search-container">
            <div className="search-box">
              <i className="bx bx-search"></i>
              <input type="text" placeholder="Search restaurants, dishes..." />
            </div>
          </div>

          <div className="deals-carousel">
            {currentDeals.map(deal => (
              <div key={deal.id} className="deal-card">
                <div className="deal-image">
                  <img src={deal.image} alt={deal.title} />
                  {deal.discount && <span className="discount-badge">{deal.discount}</span>}
                  <span className="category-tag">{deal.tag}</span>
                </div>
                <div className="deal-info">
                  <h3>{deal.title}</h3>
                  <div className="rating">
                    <span className="star">★</span>
                    <span>{deal.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="popular-section">
          <div className="section-header">
            <h2>Popular Restaurants</h2>
            <button className="see-all-btn">See all</button>
          </div>
          
          <div className="restaurant-grid">
            {popularRestaurants.map(restaurant => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <div className="rating">
                    <span className="star">★</span>
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        {/* Featured Cuisines */}
        <section className="cuisines-section">
          <div className="section-header">
            <h2>Featured Cuisines</h2>
            <button className="browse-btn">Browse</button>
          </div>
          
          <div className="cuisine-buttons">
            {featuredCuisines.map((cuisine, index) => (
              <button key={index} className="cuisine-btn" style={{backgroundColor: cuisine.color}}>
                <span className="cuisine-icon">{cuisine.icon}</span>
                {cuisine.name}
              </button>
            ))}
          </div>

          <div className="featured-offers">
            {featuredOffers.map(offer => (
              <div key={offer.id} className="offer-item">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <div className="offer-content">
                  <h4>{offer.title}</h4>
                  <p>{offer.subtitle}</p>
                </div>
                <button className="order-btn">{offer.buttonText}</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
