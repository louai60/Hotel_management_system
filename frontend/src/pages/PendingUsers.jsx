import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from '../Config/ApiConfig';

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
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Pending Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Actions'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    className="border rounded px-2 py-1"
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
                    <option value="ROLE_MAINTENANCE">Maintenance</option>
                    <option value="ROLE_MODERATOR">Moderator</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
  );
};

export default PendingUsersTable;
