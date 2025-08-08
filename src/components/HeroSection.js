import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Food', icon: '🍔', route: '/food', color: '#4A90E2' },
    { name: 'Shops', icon: '🛍️', route: '/shops', color: '#7ED321' },
    { name: 'Groceries', icon: '🥬', route: '/groceries', color: '#F5A623' },
    { name: 'Pharmacy', icon: '💊', route: '/pharmacy', color: '#BD10E0' },
    { name: 'Delivery', icon: '📦', route: '/delivery', color: '#B8E986' }
  ];

  const handleCategoryClick = (category) => {
    if (category.route === '/food') {
      navigate('/food');
    } else {
      // For other categories, show coming soon
      alert(`${category.name} coming soon!`);
    }
  };

  return (
    <section className="hero">
      <div className="blob-menu">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`blob-menu__item blob-menu__item--${category.name.toLowerCase()}`}
            onClick={() => handleCategoryClick(category)}
            style={{ backgroundColor: category.color }}
          >
            <div className="blob-menu__content">
              <div className="blob-menu__icon">
                <span style={{ fontSize: '24px' }}>{category.icon}</span>
              </div>
              <span className="blob-menu__text">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;