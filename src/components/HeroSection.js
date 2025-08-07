
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="blob-menu">
        <Link to="#shops" className="blob-menu__item blob-menu__item--shops">
          <div className="blob-menu__content">
            <div className="blob-menu__icon">
              <img
                src="./glovoimages/cc38634d7f470f25c61bb209899f12a44032cb0251409b4cd75368da5c88.png"
                alt="Shopping bags icon"
              />
            </div>
            <span className="blob-menu__text">Shops</span>
          </div>
        </Link>

        <Link to="#groceries" className="blob-menu__item blob-menu__item--groceries">
          <div className="blob-menu__content">
            <div className="blob-menu__icon">
              <img
                src="./glovoimages/6590ca182c60df74bfef8aa3a427f17c50a32824bc9979e4b5d5a40dc5a8.png"
                alt="Shopping cart icon"
              />
            </div>
            <span className="blob-menu__text">Groceries</span>
          </div>
        </Link>

        <Link to="/food" className="blob-menu__item blob-menu__item--food">
          <div className="blob-menu__content">
            <div className="blob-menu__icon">
              <img
                src="./glovoimages/c662b1ad74dc7c385a968aacf39778c327509a9d4e3e3d060a420c9c293d.png"
                alt="Food icon"
              />
            </div>
            <span className="blob-menu__text">Food</span>
          </div>
        </Link>

        <Link to="#pharmacy" className="blob-menu__item blob-menu__item--pharmacy">
          <div className="blob-menu__content">
            <div className="blob-menu__icon">
              <img
                src="./glovoimages/abe0e6d60c9e6e62d73ede9d1eec870dac15283d32b5aeee41045402e466.png"
                alt="Pharmacy icon"
              />
            </div>
            <span className="blob-menu__text">Pharmacy & Beauty</span>
          </div>
        </Link>

        <Link to="#delivery" className="blob-menu__item blob-menu__item--delivery">
          <div className="blob-menu__content">
            <div className="blob-menu__icon">
              <img
                src="./glovoimages/3ec9bff5a4a85485922e6c6f74de529bc7981ac30e5766e8a8648c7d3f28.png"
                alt="Delivery icon"
              />
            </div>
            <span className="blob-menu__text">Package<br />Delivery</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
