// ChatApp.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user', isActive: false },
    { text: '您好，有什么可以帮助您吗？', sender: 'bot', isActive: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  // 初始化 WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:3600/question');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const resData = JSON.parse(event.data);
      console.log('Received:', resData);

      setMessages(prev => {
        const activeIndex = prev.findIndex(msg => msg.isActive === true);

        if (!resData.isEnd) {
          if (activeIndex === -1) {
            // 开始新回复
            return [...prev, { text: resData.data, sender: 'bot', isActive: true }];
          } else {
            // 追加到当前回复
            const updated = [...prev];
            updated[activeIndex] = {
              ...updated[activeIndex],
              text: updated[activeIndex].text + resData.data
            };
            return updated;
          }
        } else {
          // 结束回复
          if (activeIndex !== -1) {
            const updated = [...prev];
            updated[activeIndex] = { ...updated[activeIndex], isActive: false };
            return updated;
          }
          return prev;
        }
      });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting in 1.5s...');
      setTimeout(() => {
        // 简单重连（实际项目建议加防抖/最大重试次数）
        if (socketRef.current?.readyState === WebSocket.CLOSED) {
          // 触发重新 mount（或手动重连）
          window.location.reload(); // 简单粗暴
        }
      }, 1500);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    const msg = newMessage.trim();
    if (!msg || !socketRef.current) return;

    // 添加用户消息
    setMessages(prev => [...prev, { text: msg, sender: 'user', isActive: false }]);
    socketRef.current.send(msg);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="response-container">
              {msg.text}
              {msg.isActive && <span className="cursor">|</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;