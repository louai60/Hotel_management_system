import React, { useEffect, useState } from 'react';

const CurrentUserDisplay = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Read the user information from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      // Parse the JSON data stored in local storage
      const parsedUserData = JSON.parse(userData);
      setCurrentUser(parsedUserData);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Clear current user state
    setCurrentUser(null);
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.firstName} {currentUser.lastName}</p>
          <p>Email: {currentUser.email}</p>
          {/* <p>Roles: {currentUser.roles.map(role => role.name).join(', ')}</p> */}
          <p>Roles: {currentUser.roles}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default CurrentUserDisplay;
