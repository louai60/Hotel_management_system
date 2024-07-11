import React, { useState } from 'react';
import UserList from './UserList';
import ChatBox from './ChatBox';
import AdminLayout from '../AdminLayout';

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (user) => {
        console.log('Selected user:', user);
        setSelectedUser(user);
    };

    return (
        <AdminLayout>
            <div className="flex h-screen">
                <UserList onSelectUser={handleSelectUser} />
                <ChatBox selectedUser={selectedUser} />
            </div>
        </AdminLayout>
    );
};

export default Chat;
