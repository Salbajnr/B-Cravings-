
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import SearchForm from './SearchForm';
import HeroSection from './HeroSection';
import StoreCard from './StoreCard';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentDeals, setCurrentDeals] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Fetch mock data from JSONPlaceholder
      const [dealsResponse, restaurantsResponse] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6'),
        axios.get('https://jsonplaceholder.typicode.com/users')
      ]);

      // Transform deals data
      const deals = dealsResponse.data.map(post => ({
        id: post.id,
        title: post.title.split(' ').slice(0, 2).join(' ') + ' Restaurant',
        rating: (4.0 + Math.random()).toFixed(1),
        image: `https://picsum.photos/400/250?random=${post.id}`,
        tag: ['Fast Food', 'Pizza', 'Asian', 'Mexican', 'Italian'][Math.floor(Math.random() * 5)],
        discount: Math.random() > 0.5 ? `${Math.floor(Math.random() * 30 + 10)}% OFF` : null
      }));

      // Transform restaurants data
      const restaurants = restaurantsResponse.data.map(user => ({
        id: user.id,
        name: user.company.name + ' Kitchen',
        rating: (4.0 + Math.random()).toFixed(1),
        image: `https://picsum.photos/300/200?random=${user.id + 100}`,
        cuisine: ['Italian', 'Chinese', 'Mexican', 'American', 'Indian'][Math.floor(Math.random() * 5)],
        deliveryTime: `${Math.floor(Math.random() * 20 + 15)}-${Math.floor(Math.random() * 15 + 30)} min`,
        deliveryFee: `$${(Math.random() * 3 + 1).toFixed(2)}`
      }));

      setCurrentDeals(deals);
      setPopularRestaurants(restaurants);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    setLoading(false);
  };

  const featuredCuisines = [
    { name: "Burgers", color: "#4A90E2", icon: "🍔" },
    { name: "Pizza", color: "#7ED321", icon: "🍕" },
    { name: "Sushi", color: "#F5A623", icon: "🍱" },
    { name: "Mexican", color: "#BD10E0", icon: "🌮" }
  ];

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <HeroSection />

        {/* Search Section */}
        <SearchForm onResults={setSearchResults} />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="search-results-section">
            <h2>Search Results</h2>
            <div className="restaurant-grid">
              {searchResults.map(restaurant => (
                <StoreCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </section>
        )}

        {/* Current Deals Section */}
        <section className="deals-section">
          <div className="section-header">
            <h2>Current Deals</h2>
            <button className="view-all-btn">View all</button>
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
            {popularRestaurants.slice(0, 4).map(restaurant => (
              <StoreCard key={restaurant.id} {...restaurant} />
            ))}
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
              <button 
                key={index} 
                className="cuisine-btn" 
                style={{backgroundColor: cuisine.color}}
                onClick={() => alert(`${cuisine.name} restaurants coming soon!`)}
              >
                <span className="cuisine-icon">{cuisine.icon}</span>
                {cuisine.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
