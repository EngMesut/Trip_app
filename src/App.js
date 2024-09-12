import React, { useState } from 'react';
import Login from "./components/Login";
import CreateTrip from './components/CreateTrip';
import ListTrips from './components/ListTrips';
import Navbar from './components/Navbar'; // Import Navbar component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [selectedOption, setSelectedOption] = useState('create'); // Default option is "create"

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setToken(null); // Update state
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="flex flex-col h-screen  ">
      {/* Navbar */}
      <Navbar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleLogout={handleLogout}
      />

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {selectedOption === 'create' && <CreateTrip />}
        {selectedOption === 'list' && <ListTrips />}
      </div>
    </div>
  );
};

export default App;
