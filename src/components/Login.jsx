import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://acc-api.samesoft.app/user/login', {
        email,
        password
      });
      if (response.data.success) {
        setToken(response.data.data);
        localStorage.setItem('token', response.data.data); // Store token
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-3xl text-blue-500 font-bold text-center mb-6">SOM-BOOKING</h2>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
