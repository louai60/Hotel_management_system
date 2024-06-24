import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from '../../Config/ApiConfig';
import AdminLayout from '../AdminLayout';

const PendingUsersTable = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/pending-users`);
      if (response.ok) {
        const data = await response.json();
        setPendingUsers(data);
        toast.success('Pending users fetched successfully!');
      } else {
        console.error('Failed to fetch pending users:', response.statusText);
        toast.error('Failed to fetch pending users.');
      }
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast.error('Error fetching pending users.');
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify-user/${userId}?roleName=${selectedRole}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchPendingUsers();
        toast.success('User verified successfully!');
      } else {
        console.error('Failed to verify user:', response.statusText);
        toast.error('Failed to verify user.');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      toast.error('Error verifying user.');
    }
  };

  return (
    <AdminLayout>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pending Users</h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">ID</div>
                  </th>
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
                    <div className="font-semibold text-left">Role</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="p-2">
                      <div className="text-slate-800 dark:text-slate-100">{user.id}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-slate-800 dark:text-slate-100">{user.firstName}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-slate-800 dark:text-slate-100">{user.lastName}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-slate-800 dark:text-slate-100">{user.email}</div>
                    </td>
                    <td className="p-2">
                      <div>
                        <select
                          className="border rounded px-2 py-1 dark:bg-slate-700 dark:text-slate-300"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          <option value="ROLE_ADMIN">Admin</option>
                          <option value="ROLE_EMPLOYEE">Employee</option>
                          <option value="ROLE_GUEST">Guest</option>
                          <option value="ROLE_MANAGER">Manager</option>
                          <option value="ROLE_RECEPTIONIST">Receptionist</option>
                          <option value="ROLE_CHEF">Chef</option>
                          <option value="ROLE_HOUSEKEEPING">Housekeeping</option>
                          <option value="ROLE_ADMIN">Admin</option>
                          <option value="ROLE_MODERATOR">Moderator</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        onClick={() => handleVerifyUser(user.id)}
                        disabled={!selectedRole}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PendingUsersTable;
