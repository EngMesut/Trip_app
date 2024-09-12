import React, { useState } from 'react';
import axios from 'axios';

const ListTrips = () => {
  const [trips, setTrips] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const token = localStorage.getItem('token'); // Retrieve token

  const fetchTrips = async () => {
    setLoading(true); // Set loading to true before the request
    
    try {
      const response = await axios.post(
        'https://acc-api.samesoft.app/trips',
        { from, to },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips', error);
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={fetchTrips} className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch Trips
        </button>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>TID</th>
            <th>City From</th>
            <th>City To</th>
            <th>Rate</th>
            <th>Bkg_Date</th>
            <th>Dept_Date</th>
            <th>Com_Date</th>
            <th>Truck_No</th>
            <th>Status</th>
            <th>Cont_No</th>
            <th>Party_ID</th>
            {/* Add more table headers */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11" className="text-center py-4"> {/* Adjust colSpan to match the number of columns */}
                <span>Loading...</span> {/* You can replace this with a spinner component */}
              </td>
            </tr>
          ) : (
            trips.map((trip) => (
              <tr key={trip.TID}>
                <td>{trip.TID}</td>
                <td>{trip.City_From}</td>
                <td>{trip.City_To}</td>
                <td>{trip.Rate}</td>
                <td>{trip.Bkg_Date}</td>
                <td>{trip.Dept_Date}</td>
                <td>{trip.Com_Date}</td>
                <td>{trip.Truck_No}</td>
                <td>{trip.Status}</td>
                <td>{trip.Cont_No}</td>
                <td>{trip.Party_ID}</td>
                {/* Add more table data */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTrips;
