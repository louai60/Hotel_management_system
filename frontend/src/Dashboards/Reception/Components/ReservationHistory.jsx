import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ReceptionLayout from '../ReceptionLayout';

const ReceptionHistory = () => {
  const [receptions, setReceptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReceptionHistory();
  }, []);

  const fetchReceptionHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/receptions');

      if (Array.isArray(response.data)) {
        setReceptions(response.data);
      } else if (typeof response.data === 'object') {
        setReceptions([response.data]);
      }
    } catch (error) {
      console.error('Error fetching reception history:', error);
      setError('Error fetching reception history. Please try again later.');
    }
  };

  return (
    <ReceptionLayout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Reception History</h2>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : receptions.length === 0 ? (
          <p className="text-gray-600">No receptions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Client Name</th>
                  <th className="border border-gray-200 px-4 py-2">Check-in Date</th>
                  <th className="border border-gray-200 px-4 py-2">Check-out Date</th>
                  <th className="border border-gray-200 px-4 py-2">Room Number</th>
                  <th className="border border-gray-200 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {receptions.map((reception) => (
                  <tr key={reception.id}>
                    <td className="border border-gray-200 px-4 py-2">{reception.clientName}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {format(new Date(reception.checkInDate), 'MM/dd/yyyy')}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {format(new Date(reception.checkOutDate), 'MM/dd/yyyy')}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{reception.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ReceptionLayout>
  );
};

export default ReceptionHistory;
