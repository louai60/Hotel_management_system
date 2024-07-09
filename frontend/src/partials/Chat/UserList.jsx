import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

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
