
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = ({ onResults, placeholder = "Search restaurants, dishes..." }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchRestaurants = async (searchQuery) => {
    if (!searchQuery.trim()) {
      onResults([]);
      return;
    }

    setLoading(true);
    try {
      // Using JSONPlaceholder as mock API for restaurants
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`);
      
      // Transform the data to match restaurant structure
      const restaurants = response.data.slice(0, 8).map(post => ({
        id: post.id,
        name: post.title.split(' ').slice(0, 2).join(' ') + ' Restaurant',
        rating: (4.0 + Math.random()).toFixed(1),
        cuisine: ['Italian', 'Chinese', 'Mexican', 'American'][Math.floor(Math.random() * 4)],
        image: `https://picsum.photos/300/200?random=${post.id}`,
        description: post.body.substring(0, 100) + '...'
      }));
      
      onResults(restaurants);
    } catch (error) {
      console.error('Search failed:', error);
      onResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchRestaurants(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-box">
        <i className="bx bx-search"></i>
        <input 
          type="text" 
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <div className="search-loading">...</div>}
      </div>
    </div>
  );
};

export default SearchForm;
