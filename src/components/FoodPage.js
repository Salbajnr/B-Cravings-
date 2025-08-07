
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const FoodPage = () => {
  const categories = [
    { name: "Filters", icon: "./glovoimages/bicycle.svg" },
    { name: "Chicken", icon: "./glovoimages/bicycle.svg" },
    { name: "Fast food", icon: "./glovoimages/bicycle.svg" },
    { name: "Halal", icon: "./glovoimages/bicycle.svg" },
  ];

  return (
    <>
      <Header isFood={true} />
      <div className="formbcc">
        <div className="search_what">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="What can we get you" />
        </div>
      </div>
      <div className="food_category">
        {categories.map((category, index) => (
          <div key={index} className="f_cat">
            <div className="imgf">
              <img src={category.icon} alt="" />
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FoodPage;
