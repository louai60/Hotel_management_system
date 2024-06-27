import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardCard07() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/employees')
      .then(response => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Employees</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">First Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Last Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Date of Birth</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Date of Hire</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Salary</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Bonuses</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Benefits</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Role</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.firstName}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.lastName}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.email}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.dateOfHire ? new Date(employee.dateOfHire).toLocaleDateString() : ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.phone || ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.salary != null ? `$${employee.salary.toFixed(2)}` : ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.bonuses != null ? `$${employee.bonuses.toFixed(2)}` : ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.benefits || ''}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{employee.role || ''}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
