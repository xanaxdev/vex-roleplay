// src/components/Chat.tsx
import { useEffect, useRef, useState } from 'react';
import './styles.css';

type Message = { author: string; text: string; time: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pushChatMessage = (author: string, text: string) => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { author, text, time }]);
    };

    (window as any).pushChatMessage = pushChatMessage;

    (window as any).debugLog = (msg: string) => console.log('[Chat Debug]', msg);
    (window as any).mp?.trigger('cefReady');

    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't' && !visible) {
        e.preventDefault();
        setVisible(true);
        setTimeout(() => {
          document.getElementById('chat-input')?.focus();
        }, 50);
        (window as any).mp?.trigger('focusChat', true);
      } else if (e.key === 'Escape' && visible) {
        setVisible(false);
        (window as any).mp?.trigger('focusChat', false);
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => {
      window.removeEventListener('keydown', handleGlobalKey);
    };
  }, [visible]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    (window as any).mp?.trigger('chatMessage', input);
    setInput('');
    setVisible(false);
    (window as any).mp?.trigger('focusChat', false);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div className="chat-message" key={i}>
            <span className="chat-time">[{msg.time}]</span>{' '}
            <span className="chat-author">{msg.author}:</span>{' '}
            <span className="chat-text">{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {visible && (
        <input
          id="chat-input"
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          autoComplete="off"
        />
      )}
    </div>
  );
}
