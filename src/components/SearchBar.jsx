import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
