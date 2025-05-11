import React, { useState } from 'react';
import './App.css';

function App() {
  // Define your constants here
  const USER_ID = "vedika_joshi_0827CY221066";
  const EMAIL = "vedikajoshi220951@acropolis.in";
  const ROLL_NUMBER = "0827CY221066"; // This was missing

  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSections, setActiveSections] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true
  });

  // Use deployed backend URL if in production
  const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://bfhl-backend-bu7d.onrender.com/bfhl' 
    : 'http://localhost:3000/bfhl';

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      
      const parsedData = JSON.parse(input);
      
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="app-container">
      <h1>{ROLL_NUMBER}</h1> {/* Now properly defined */}
      
      {/* Rest of your component remains the same */}
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data like {"data": ["M","1","334","4","B"]}'
          rows={5}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {response && (
        <div className="response-container">
          <div className="user-info">
            <p><strong>Status:</strong> {response.is_success ? 'Success' : 'Failed'}</p>
            <p><strong>User ID:</strong> {response.user_id}</p>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Roll Number:</strong> {response.roll_number}</p>
          </div>
          
          <div className="section-toggles">
            <label>
              <input
                type="checkbox"
                checked={activeSections.numbers}
                onChange={() => toggleSection('numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeSections.alphabets}
                onChange={() => toggleSection('alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeSections.highestAlphabet}
                onChange={() => toggleSection('highestAlphabet')}
              />
              Highest Alphabet
            </label>
          </div>
          
          {activeSections.numbers && (
            <div className="section">
              <h3>Numbers</h3>
              {response.numbers.length > 0 ? (
                <ul>
                  {response.numbers.map((num, i) => (
                    <li key={i}>{num}</li>
                  ))}
                </ul>
              ) : <p>No numbers found</p>}
            </div>
          )}
          
          {activeSections.alphabets && (
            <div className="section">
              <h3>Alphabets</h3>
              {response.alphabets.length > 0 ? (
                <ul>
                  {response.alphabets.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              ) : <p>No alphabets found</p>}
            </div>
          )}
          
          {activeSections.highestAlphabet && (
            <div className="section">
              <h3>Highest Alphabet</h3>
              {response.highest_alphabet && response.highest_alphabet.length > 0 ? (
                <p>{response.highest_alphabet[0]}</p>
              ) : <p>No highest alphabet found</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;