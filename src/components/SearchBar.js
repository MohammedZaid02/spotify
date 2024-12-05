import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 relative">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full p-4 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search Song, Artist"
      />
      <IoMdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
