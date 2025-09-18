import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import Header from './Header';
import StoreCard from './StoreCard';
import SearchForm from './SearchForm';

const FoodPage = () => {
  const { state, dispatch } = useApp();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');

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
  }, [restaurants, searchQuery, selectedCategory, sortBy]);

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

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'delivery-time':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'delivery-fee':
          return parseInt(a.deliveryFee.replace('₦', '')) - parseInt(b.deliveryFee.replace('₦', ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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

          <div className="sort-controls">
            <label>Sort by: </label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e1e5e9',
                borderRadius: '6px',
                background: 'white'
              }}
            >
              <option value="rating">Rating</option>
              <option value="delivery-time">Delivery Time</option>
              <option value="delivery-fee">Delivery Fee</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

      <div className="food-categories">
        {categories.map(category => (
          <button
            key={category.name}
            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.name)}
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