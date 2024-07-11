import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.id !== loggedInUserId);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [loggedInUserId]);

  return (
    <div className="user-list w-1/4 border-r border-gray-300 p-4">
      <h3 className="text-lg font-semibold mb-4">Users</h3>
      <ul className="space-y-2">
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => onSelectUser && onSelectUser(user)}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
          >
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
