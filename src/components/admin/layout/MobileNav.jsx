import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';

const MobileNav = ({ toggleMenu, isMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Search for:', searchTerm);
    // Add your search logic here
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-30 p-4 bg-white shadow-sm flex items-center space-x-3">
      {/* Hamburger toggle button */}
      {!isMenuOpen && (
        <button 
          className="p-2 rounded-md bg-gray-100"
          onClick={toggleMenu}
        >
          <FaBars className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {/* Search bar */}
      <div className="flex flex-1 items-center border border-gray-300 rounded-md px-2 bg-white">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 py-1 px-2 text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="text-gray-500 hover:text-blue-500">
          <FaSearch className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
