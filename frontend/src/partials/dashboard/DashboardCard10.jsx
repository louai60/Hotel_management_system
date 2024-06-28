import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardCard10() {
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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Customers</h2>
      </header>
      <div className="p-10">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full xl:w-full">
            {/* Table header */}
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
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
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
      </div>
    </div>


  );
}

export default DashboardCard10;
