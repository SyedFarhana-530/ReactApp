'use client';

import { useState } from 'react';
import styles from '../styles/ChatBox.module.css';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newUserMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { prompt: input });
      const assistantMessage: Message = { role: 'assistant', content: res.data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error from AI' }]);
    }
    setLoading(false);
  };

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.messageList}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
          </div>
        ))}
        {loading && (
          <div className={styles.assistant}>
            <em>Assistant is typing...</em>
          </div>
        )}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className={styles.sendButton} onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
