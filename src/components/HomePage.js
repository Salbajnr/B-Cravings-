
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import SearchForm from './SearchForm';
import StoreCard from './StoreCard';

const HomePage = () => {
  const storeData = [
    { title: "KFC", rating: 94, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", tag: "Chicken" },
    { title: "Chicken Tonight", rating: 92, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", tag: "Chicken", discount: "-30%" },
    { title: "Sta Xpress", rating: 95, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", tag: "Chicken" },
    { title: "Ugaroll", rating: 93, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", tag: "Chicken" },
  ];

  const categories = ["Fast food", "Chicken", "Snacks", "Pizza", "Burgers", "Local food", "Indian", "Grill", "Healthy", "Sandwich"];

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <div className="stores">
          <h3>
            <img src="./glovoimages/newUserRecommendationsWidgetIconLight.png" alt="" />
            <span>Stores you might like</span>
          </h3>
          <SearchForm />
          <div className="card-grid">
            {storeData.map((store, index) => (
              <StoreCard key={index} {...store} />
            ))}
            {storeData.map((store, index) => (
              <StoreCard key={index + 4} {...store} />
            ))}
          </div>
        </div>
        <div className="top_category">
          <div className="top_svg">
            <img src="./glovoimages/cities.svg" alt="" />
          </div>
          <h1>Top Categories in Kampala</h1>
          <div className="top_bottons">
            {categories.map((category, index) => (
              <button key={index} className="top_btn">{category}</button>
            ))}
          </div>
        </div>
        <div className="together">
          <div className="together_svg">
            <img src="./glovoimages/together-opt.svg" alt="" />
          </div>
          <h1>Let's do it together</h1>
          <div className="together_cards">
            <div className="together_card">
              <div className="img_togther">
                <img src="./glovoimages/rider-image-opt.png" alt="" />
              </div>
              <h2>Become a rider</h2>
              <p>
                Enjoy flexibility, freedom and competitive earnings by delivering
                through Glovo.
              </p>
              <button className="glovo_together">Register here</button>
            </div>
            <div className="together_card">
              <div className="img_togther">
                <img src="./glovoimages/partners-image-opt.png" alt="" />
              </div>
              <h2>Become a partner</h2>
              <p>
                Grow your business and reach new customers by partnering with
                Glovo.
              </p>
              <button className="glovo_together">Register here</button>
            </div>
            <div className="together_card">
              <div className="img_togther">
                <img src="./glovoimages/careers-image-opt.png" alt="" />
              </div>
              <h2>Join our team</h2>
              <p>
                Help us build the future of on-demand delivery and be part of
                our team.
              </p>
              <button className="glovo_together">Register here</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
