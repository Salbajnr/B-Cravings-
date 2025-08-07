
import React, { useState } from 'react';

const SearchForm = ({ className = "form", placeholder = "What can we get you" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <i className="bx bx-search"></i>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
