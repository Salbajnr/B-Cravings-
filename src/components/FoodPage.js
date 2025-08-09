
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import StoreCard from './StoreCard';

const FoodPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "All", icon: "🔍" },
    { name: "Chicken", icon: "🍗" },
    { name: "Pizza", icon: "🍕" },
    { name: "Fast food", icon: "🍔" },
    { name: "Halal", icon: "🥘" },
    { name: "Asian", icon: "🥢" },
    { name: "Mexican", icon: "🌮" }
  ];

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [activeFilter, searchQuery, restaurants]);

  const loadRestaurants = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      
      const restaurantData = response.data.map(user => ({
        id: user.id,
        name: user.company.name + ' Kitchen',
        rating: (4.0 + Math.random()).toFixed(1),
        image: `https://picsum.photos/300/200?random=${user.id + 200}`,
        cuisine: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
        deliveryTime: `${Math.floor(Math.random() * 20 + 15)}-${Math.floor(Math.random() * 15 + 30)} min`,
        deliveryFee: `₦${(Math.random() * 1000 + 500).toFixed(0)}`,
        isPromoted: Math.random() > 0.7
      }));

      setRestaurants(restaurantData);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
    setLoading(false);
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="food-page">
      <Header isFood={true} />
      
      <div className="formbcc">
        <div className="search_what">
          <i className="bx bx-search"></i>
          <input 
            type="text" 
            placeholder="What can we get you"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="food_category">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`f_cat ${activeFilter === category.name ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.name)}
          >
            <div className="imgf">
              <span style={{ fontSize: '24px' }}>{category.icon}</span>
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className="restaurants-container">
        {loading ? (
          <div className="loading-spinner">Loading restaurants...</div>
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map(restaurant => (
              <StoreCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FoodPage;
