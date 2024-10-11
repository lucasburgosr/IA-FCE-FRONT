import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    // Agregar el mensaje del usuario a la lista
    const newMessage: Message = { sender: 'user', text: inputMessage };
    setMessages([...messages, newMessage]);
  
    try {
      // Enviar el mensaje al backend
      const response = await axios.post('http://179.0.136.80/api/chat', {
        message: inputMessage,
      });
  
      console.log("Response from backend:", response.data);  // Verifica lo que el backend está devolviendo
  
      // Verifica si response.data.messages es un array
      let assistantMessageText = '';
      if (Array.isArray(response.data.messages)) {
        assistantMessageText = response.data.messages[0];  // Toma solo el primer mensaje
      } else {
        console.error("Unexpected message format:", response.data.messages);
      }
  
      // Si hay un mensaje del asistente, lo agregamos al estado
      if (assistantMessageText) {
        const assistantMessage: Message = {
          sender: 'assistant',
          text: assistantMessageText,
        };
        setMessages([...messages, newMessage, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    // Limpiar el campo de entrada
    setInputMessage('');
  };
  
  
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'assistant'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe tu mensaje"
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>

      <style>{`
        .chat-window {
          width: 525px;
          margin: 0 auto;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
        }
        .messages {
          height: 300px;
          overflow-y: scroll;
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
        }
        .message {
          padding: 5px 10px;
          margin: 5px 0;
          border-radius: 5px;
          color: black;
        }
        .user {
          background-color: #d1f5d3;
          align-self: flex-end;
        }
        .assistant {
          background-color: #f0f0f0;
          align-self: flex-start;
        }
        .input-area {
          display: flex;
        }
        input {
          flex: 1;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 8px 16px;
          font-size: 16px;
          margin-left: 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
