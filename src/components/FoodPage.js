
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import StoreCard from './StoreCard';
import SearchForm from './SearchForm';

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
      // Fallback to mock data
      const mockData = [
        {
          id: 1,
          name: "Mama's Kitchen",
          rating: "4.5",
          image: "/bcravings-images/7f883ec1cf82cee10668bff77ff6d5448bba9ede18c56d9d74afcd9c8a77.jpeg",
          cuisine: "Nigerian",
          deliveryTime: "25-35 min",
          deliveryFee: "₦200",
          isPromoted: true
        },
        {
          id: 2,
          name: "Suya Palace",
          rating: "4.7",
          image: "/bcravings-images/c9efcd63fa9333697bfeadd414184667f1056e0b0e82ba64c8feb6ea2b8a.jpeg",
          cuisine: "Grilled",
          deliveryTime: "20-30 min",
          deliveryFee: "₦150",
          isPromoted: false
        }
      ];
      setRestaurants(mockData);
    }
    setLoading(false);
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="food-page">
        <Header />
        <div className="loading">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="food-page">
      <Header />
      
      <div className="search-section">
        <SearchForm onSearch={handleSearch} placeholder="What can we get you?" />
      </div>

      <div className="food-categories">
        {categories.map(category => (
          <button
            key={category.name}
            className={`category-btn ${activeFilter === category.name ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.name)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
            <StoreCard
              key={restaurant.id}
              {...restaurant}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
