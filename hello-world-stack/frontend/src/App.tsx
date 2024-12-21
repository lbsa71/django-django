import React, { useEffect, useState } from 'react';
import { HelloResponse } from './types/api';
import { fetchHelloMessage } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const response = await fetchHelloMessage();
        setData(response);
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
        ) : data ? (
          <div>
            <h1>{data.message}</h1>
            <div className="access-logs">
              <h2>Access Logs</h2>
              <ul>
                {data.access_logs.map((log) => (
                  <li key={log.id}>
                    Accessed at: {new Date(log.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
