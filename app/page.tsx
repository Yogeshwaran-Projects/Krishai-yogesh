'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto py-24 stretch bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap p-2 my-2 rounded-lg shadow ${
              m.role === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-300 self-start'
            }`}
          >
            {m.role === 'user' ? 'User: ' : 'Krish-AI: '}
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md flex p-4 bg-white border-t border-gray-300">
        <input
          className="flex-grow p-2 mr-2 border border-gray-300 rounded shadow-md"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded shadow-md">Send</button>
      </form>
    </div>

  );
}
