import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const loggedInUserId = JSON.parse(localStorage.getItem('user'));
  console.log(loggedInUserId.id);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:8080/api/messages/${selectedUser.id}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedUser]);

  console.log(selectedUser); 

  if (selectedUser) {
    console.log(selectedUser.id); 
  } else {
    console.log("selectedUser is null or undefined");
  }

  const handleSendMessage = () => {
    if (selectedUser && message.trim() !== '') {
      const newMessage = {
        sender_id: loggedInUserId.id,
        receiver_id: selectedUser.id,
        content: message,
      };
      console.log('--------------------------:', loggedInUserId.id); 
      console.log('Message sent to receiver_id:', selectedUser.id); 
      axios.post('http://localhost:8080/api/messages', newMessage)
        .then(response => {
          setMessages([...messages, response.data]);
          setMessage('');
          console.log('Message sent to receiver_id:', selectedUser.id); 
        })
        .catch(error => {
          console.error('Error sending message:', error);
          if (error.response) {
            console.error('Server responded with:', error.response.data);
          }
        });

    } else {
      console.error('Cannot send message: selectedUser is null or message is empty');
    }
  };

  return (
    <div className="chat-box flex flex-col flex-1 p-4">
      <h3 className="text-lg font-semibold mb-4">Chat with {selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h3>
      <div className="messages flex-1 overflow-y-auto border border-gray-300 p-4 rounded mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message p-2 rounded ${msg.sender_id === loggedInUserId.id ? 'bg-blue-100 text-right self-end' : 'bg-gray-100'}`}
          >
            <span>{msg.content}</span>
            <small className="block text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="message-input flex">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 p-2 rounded-l"
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
