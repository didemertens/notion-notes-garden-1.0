'use client';

import { useChat } from '@ai-sdk/react';

export default function Quiz() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/quiz',
  });
  return (
    <section className="py-l center flex-col text-center">
      <h1 className="text-hero text-primary mb-l">Quiz</h1>

      <div className="quiz-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <p key={`${message.id}-${i}`}>{part.text}</p>;
              }
            })}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        <input
          className="quiz-input"
          value={input}
          placeholder="Ask a question or answer..."
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
}
