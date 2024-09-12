import React, { useState } from 'react';
import axios from 'axios';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    City_From: '',
    City_To: '',
    Rate: '',
    Bkg_Date: '',
    Dept_Date: '',
    Com_Date: '',
    Truck_No: '',
    Status: 'Open',
    Cont_No: '',
    Party_ID: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        'https://acc-api.samesoft.app/trips/create',
        {
          City_From: formData.City_From,
          City_To: formData.City_To,
          Rate: parseFloat(formData.Rate), // Convert Rate to number
          Bkg_Date: formData.Bkg_Date,
          Dept_Date: formData.Dept_Date,
          Com_Date: formData.Com_Date,
          Truck_No: formData.Truck_No,
          Status: formData.Status,
          Cont_No: formData.Cont_No,
          Party_ID: formData.Party_ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMessage('Trip Created Successfully');
        setError('');
      } else {
        setError(response.data.msg || 'Failed to create trip');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl text-blue-500 font-bold text-center mb-6">Create New Trip</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'City_From', label: 'City From', type: 'text' },
            { id: 'City_To', label: 'City To', type: 'text' },
            { id: 'Rate', label: 'Rate', type: 'number' },
            { id: 'Bkg_Date', label: 'Booking Date', type: 'date' },
            { id: 'Dept_Date', label: 'Departure Date', type: 'date' },
            { id: 'Com_Date', label: 'Completion Date', type: 'date' },
            { id: 'Truck_No', label: 'Truck Number', type: 'text' },
            { id: 'Status', label: 'Status', type: 'text' },
            { id: 'Cont_No', label: 'Container Number', type: 'text' },
            { id: 'Party_ID', label: 'Party ID', type: 'text' }
          ].map((input) => (
            <div key={input.id} className="flex flex-col">
              <label htmlFor={input.id} className="block text-sm font-medium mb-2">
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                name={input.id}
                value={formData[input.id]}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required={input.type !== 'date'}
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
              disabled={loading}
            >
              {loading ? 'Creating Trip...' : 'Create Trip'}
            </button>
          </div>
        </form>

        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreateTrip;
