import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

function ChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  
  // Get logged in user ID from local storage safely
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  useEffect(() => {
    if (selectedUser && loggedInUserId) {
      // Fetch messages for the specific chat room
      axios.get(`http://localhost:8080/api/messages/${loggedInUserId}/${selectedUser.id}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error('Error fetching messages:', error));

      const socket = new SockJS('http://localhost:8080/ws');
      const client = Stomp.over(socket);

      const roomId = loggedInUserId < selectedUser.id 
        ? `${loggedInUserId}-${selectedUser.id}` 
        : `${selectedUser.id}-${loggedInUserId}`;

      client.connect({}, () => {
        client.subscribe(`/queue/private-${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });

      setStompClient(client);

      return () => {
        if (client) {
          client.disconnect();
        }
      };
    }
  }, [selectedUser, loggedInUserId]);

  const handleSendMessage = () => {
    if (selectedUser && message.trim() !== '') {
      const newMessage = {
        sender: { id: loggedInUserId },
        receiver: { id: selectedUser.id },
        content: message,
      };

      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(newMessage));
      setMessage('');
    } else {
      console.error('Cannot send message: selectedUser is null or message is empty');
    }
  };

  if (!loggedInUserId || !selectedUser) {
    return <div>Please select a user to start chatting.</div>;
  }

  return (
    <div className="chat-box flex flex-col flex-1 p-4">
      <h3 className="text-lg font-semibold mb-4">Chat with {selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h3>
      <div className="messages flex-1 overflow-y-auto border border-gray-300 p-4 rounded mb-4 space-y-2" style={{ maxHeight: '400px' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 rounded ${msg.sender.id === loggedInUserId ? 'bg-blue-100 text-right self-end' : 'bg-gray-100'}`}
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
