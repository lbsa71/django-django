import React, { useEffect, useState } from 'react';
import { Message } from './types/api';
import { fetchHelloMessage } from './services/api';
import './App.css';

function App() {
  const [message, setMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const data = await fetchHelloMessage();
        setMessage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load message');
      }
    };

    loadMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {error ? (
          <p className="error">{error}</p>
        ) : message ? (
          <div>
            <h1>{message.text}</h1>
            <p>Received at: {new Date(message.created_at).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
