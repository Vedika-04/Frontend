import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('{ "data": ["M", "1", "334", "4", "B"] }');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCharacters, setShowCharacters] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);
  const [showHighestAlphabet, setShowHighestAlphabet] = useState(true);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate JSON input
      const parsedData = JSON.parse(inputData);
      
      // Call your API - Make sure this is your deployed backend URL
      const apiUrl = 'https://bfhl-backend-bu7d.onrender.com/bfhl';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });
      
      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      setResponse(data);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.');
      } else {
        setError('Error processing your request: ' + err.message);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>BFHL Fullstack App</h1>
      
      <div className="input-container">
        <textarea
          value={inputData}
          onChange={handleChange}
          placeholder='Enter JSON data here'
          rows={5}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {response && (
        <div className="response-container">
          <div className="user-info">
            <p><strong>User ID:</strong> {response.user_id}</p>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Roll Number:</strong> {response.roll_number}</p>
            <p><strong>Status:</strong> {response.is_success ? 'Success' : 'Failed'}</p>
          </div>
          
          <div className="toggle-sections">
            <h3>Toggle Sections</h3>
            <label>
              <input
                type="checkbox"
                checked={showCharacters}
                onChange={() => setShowCharacters(!showCharacters)}
              />
              Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={showNumbers}
                onChange={() => setShowNumbers(!showNumbers)}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={showHighestAlphabet}
                onChange={() => setShowHighestAlphabet(!showHighestAlphabet)}
              />
              Highest Alphabet
            </label>
          </div>
          
          <div className="results">
            {showCharacters && (
              <div className="result-section">
                <h3>Characters:</h3>
                <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
              </div>
            )}
            
            {showNumbers && (
              <div className="result-section">
                <h3>Numbers:</h3>
                <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
              </div>
            )}
            
            {showHighestAlphabet && (
              <div className="result-section">
                <h3>Highest Alphabet:</h3>
                <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;