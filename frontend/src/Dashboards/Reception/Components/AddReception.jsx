import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddReception = () => {
  const [receptions, setReceptions] = useState([]);
  const [receptionData, setReceptionData] = useState({
    clientName: '',
    checkInDate: '',
    checkOutDate: '',
    status: '',
    numberOfGuests: 0,
    specialRequests: ''
  });

  useEffect(() => {
    fetchReceptions();
  }, []);

  const fetchReceptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/receptions');
      setReceptions(response.data);
    } catch (error) {
      console.error('Error fetching receptions:', error);
      alert('Error fetching receptions. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceptionData({
      ...receptionData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/receptions', receptionData);
      const createdReception = response.data;
      console.log('Reception created:', createdReception);
      // Update receptions state with the newly created reception
      setReceptions([...receptions, createdReception]);
      // Clear form data after successful submission if needed
      setReceptionData({
        clientName: '',
        checkInDate: '',
        checkOutDate: '',
        status: '',
        numberOfGuests: 0,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error creating reception:', error);
      alert('Error creating reception. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-lg font-medium mb-4">List of Receptions</h2>


      <h2 className="text-lg font-medium mt-8 mb-4">Create Reception</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-1">
          Client Name:
          <input type="text" name="clientName" value={receptionData.clientName} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </label>
        <label className="block mb-1">
          Check-in Date:
          <input type="datetime-local" name="checkInDate" value={receptionData.checkInDate} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </label>
        <label className="block mb-1">
          Check-out Date:
          <input type="datetime-local" name="checkOutDate" value={receptionData.checkOutDate} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </label>
        <label className="block mb-1">
          Status:
          <input type="text" name="status" value={receptionData.status} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </label>
        <label className="block mb-1">
          Number of Guests:
          <input type="number" name="numberOfGuests" value={receptionData.numberOfGuests} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </label>
        <label className="block mb-1">
          Special Requests:
          <textarea name="specialRequests" value={receptionData.specialRequests} onChange={handleChange} className="form-textarea mt-1 block w-full" rows="3"></textarea>
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Create Reception
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-in Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-out Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number of Guests
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Special Requests
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {receptions.map(reception => (
            <tr key={reception.id}>
              <td className="px-6 py-4 whitespace-nowrap">{reception.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reception.checkInDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reception.checkOutDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reception.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reception.numberOfGuests}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reception.specialRequests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddReception;
