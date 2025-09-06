import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AppContext } from '../context/AppContext';
import { fetchRestaurants } from '../services/apiService';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState([]);
  const [featuredDeals, setFeaturedDeals] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await fetchRestaurants();
        setFeaturedDeals(data);
        dispatch({ type: 'SET_RESTAURANTS', payload: data });
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load restaurants' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    getRestaurants();
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = state.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="home-page">
      <Header />

      <main>
        {/* Hero Section with Search */}
        <div className="search-section">
          <h1 className="hero-title">Hungry? We've Got You Covered</h1>
          <p className="hero-subtitle">Discover amazing restaurants and get your favorite food delivered fast in Bauchi</p>
          <div className="search-container">
            <i className="bx bx-search"></i>
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={state.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="search-results">
            <h2>Search Results</h2>
            <div className="restaurants-grid">
              {searchResults.map(restaurant => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="restaurant-card"
                >
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.cuisine}</p>
                    <div className="restaurant-meta">
                      <span>⭐ {restaurant.rating}</span>
                      <span>🕐 {restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="hero">
          <div className="blob-menu">
            {/* Top blobs */}
            <a href="#shops" className="blob-menu__item blob-menu__item--shops">
              <div className="blob-menu__content">
                <div className="blob-menu__icon">
                  <img
                    src="./bcravings-images/cc38634d7f470f25c61bb209899f12a44032cb0251409b4cd75368da5c88.png"
                    alt="Shopping bags icon"
                  />
                </div>
                <span className="blob-menu__text">Shops</span>
              </div>
            </a>

            <a href="#groceries" className="blob-menu__item blob-menu__item--groceries">
              <div className="blob-menu__content">
                <div className="blob-menu__icon">
                  <img
                    src="./bcravings-images/6590ca182c60df74bfef8aa3a427f17c50a32824bc9979e4b5d5a40dc5a8.png"
                    alt="Shopping cart icon"
                  />
                </div>
                <span className="blob-menu__text">Groceries</span>
              </div>
            </a>

            {/* Center blob */}
            <Link to="/food" className="blob-menu__item blob-menu__item--food">
              <div className="blob-menu__content">
                <div className="blob-menu__icon">
                  <img
                    src="./bcravings-images/3ec9bff5a4a85485922e6c6f74de529bc7981ac30e5766e8a8648c7d3f28.png"
                    alt="Food icon"
                  />
                </div>
                <span className="blob-menu__text">Food</span>
              </div>
            </Link>

            {/* Bottom blobs */}
            <a href="#pharmacy" className="blob-menu__item blob-menu__item--pharmacy">
              <div className="blob-menu__content">
                <div className="blob-menu__icon">
                  <img
                    src="./bcravings-images/abe0e6d60c9e6e62d73ede9d1eec870dac15283d32b5aeee41045402e466.png"
                    alt="Pharmacy icon"
                  />
                </div>
                <span className="blob-menu__text">Pharmacy</span>
              </div>
            </a>

            <a href="#courier" className="blob-menu__item blob-menu__item--courier">
              <div className="blob-menu__content">
                <div className="blob-menu__icon">
                  <img
                    src="./bcravings-images/c662b1ad74dc7c385a968aacf39778c327509a9d4e3e3d060a420c9c293d.png"
                    alt="Courier icon"
                  />
                </div>
                <span className="blob-menu__text">Courier</span>
              </div>
            </a>
          </div>
        </div>

        {/* Featured Restaurants */}
        {featuredDeals.length > 0 && (
          <section className="featured-section">
            <h2>Featured Restaurants</h2>
            <div className="restaurants-grid">
              {featuredDeals.map(restaurant => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="restaurant-card"
                >
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.cuisine}</p>
                    <div className="restaurant-meta">
                      <span>⭐ {restaurant.rating}</span>
                      <span>🕐 {restaurant.deliveryTime}</span>
                      <span className={restaurant.isOpen ? 'open' : 'closed'}>
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="top_category">
          <div className="top_svg">
            <img src="./bcravings-images/cities.svg" alt="" />
          </div>
          <h1>Top Categories in Bauchi</h1>
          <div className="top_bottons">
            {['Fast food', 'Chicken', 'Snacks', 'Pizza', 'Burgers', 'Local food', 'Indian', 'Grill', 'Healthy', 'Sandwich'].map(category => (
              <button key={category} className="top_btn" onClick={() => handleSearch(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="together">
          <div className="together_svg">
            <img src="./bcravings-images/together-opt.svg" alt="" />
          </div>
          <h1>Let's do it together</h1>
          <div className="together_cards">
            <div className="together_card">
              <div className="img_togther">
                <img src="./bcravings-images/rider-image-opt.png" alt="" />
              </div>
              <h2>Become a rider</h2>
              <p>
                Enjoy flexibility, freedom and competitive earnings by delivering
                through B-Cravings.
              </p>
              <button className="bcravings_together">Register here</button>
            </div>
            <div className="together_card">
              <div className="img_togther">
                <img src="./bcravings-images/partners-image-opt.png" alt="" />
              </div>
              <h2>Become a partner</h2>
              <p>
                Grow your business and reach more customers by partnering with
                B-Cravings.
              </p>
              <button className="bcravings_together">Register here</button>
            </div>
            <div className="together_card">
              <div className="img_togther">
                <img src="./bcravings-images/careers-image-opt.png" alt="" />
              </div>
              <h2>Join our team</h2>
              <p>
                Be part of an innovative team that's changing the way people get
                things done.
              </p>
              <button className="bcravings_together">See careers</button>
            </div>
          </div>
        </div>

        {state.loading && (
          <div className="loading-spinner">
            <div className="spinner">Loading...</div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;