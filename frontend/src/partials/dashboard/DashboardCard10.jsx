import React, { useEffect, useState } from 'react';

function DashboardCard10() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment data from the backend API
    fetch('http://localhost:8080/api/payments')
      .then(response => response.json())
      .then(data => setPayments(data))
      .catch(error => console.error('Error fetching payments:', error));
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Payments</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Payment Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Method</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Reception ID</div>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{payment.id}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{payment.amount}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{new Date(payment.paymentDate).toLocaleString()}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{payment.paymentMethod}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{payment.status}</div>
                  </td>
                  {/* <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{payment.reception.id}</div>
                  </td> */}
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
