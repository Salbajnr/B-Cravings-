
import React from 'react';

const StoreCard = ({ title, rating, image, tag, discount }) => {
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={title} />
        <span className="card__tag">{tag}</span>
        {discount && <span className="card__discount">{discount}</span>}
      </div>
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        <div className="card__rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span>{rating}%</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
