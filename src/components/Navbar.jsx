import React from 'react';

const Navbar = ({ selectedOption, setSelectedOption, handleLogout }) => {
  return (
    <div className="bg-white shadow-2xl shadow-gray-900 text-gray-900 flex items-center justify-between px-4 py-2">
      <h2 className="text-2xl font-bold">SOM-BOOKING</h2>
      <nav className="flex space-x-4">
        <button
          onClick={() => setSelectedOption('create')}
          className={`px-4 py-2 rounded-lg hover:bg-gray-200 ${
            selectedOption === 'create' ? 'bg-gray-200' : ''
          }`}
        >
          Create Trip
        </button>
        <button
          onClick={() => setSelectedOption('list')}
          className={`px-4 py-2 rounded-lg hover:bg-gray-200 ${
            selectedOption === 'list' ? 'bg-gray-200' : ''
          }`}
        >
          List Trips
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-400 text-white hover:bg-red-500 transition-all rounded-lg"
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
