import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('{ "data": ["M", "1", "334", "4", "B"] }');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    characters: true,
    numbers: true,
    highestAlphabet: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Parse the JSON input
      const parsedData = JSON.parse(inputData);
      
      // Make API call to your backend
      const response = await fetch('https://bfhl-backend-bu7d.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      setResponse(result);
    } catch (err) {
      setError('Invalid JSON or API error: ' + err.message);
      console.error(err);
    }
  };

  const handleSectionToggle = (section) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section]
    });
  };

  return (
    <div className="App">
      <h1>BFHL Fullstack App</h1>
      
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        rows={5}
        style={{ width: '100%', maxWidth: '800px' }}
      />
      
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      
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
                checked={visibleSections.characters}
                onChange={() => handleSectionToggle('characters')}
              />
              Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.numbers}
                onChange={() => handleSectionToggle('numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.highestAlphabet}
                onChange={() => handleSectionToggle('highestAlphabet')}
              />
              Highest Alphabet
            </label>
          </div>
          
          <div className="sections-container">
            {visibleSections.characters && (
              <div className="section">
                <h3>Characters:</h3>
                <pre>
                  [
                  {response.alphabets && response.alphabets.map((char, index) => (
                    <div key={index}>  "{char}"{index < response.alphabets.length - 1 ? ',' : ''}</div>
                  ))}
                  ]
                </pre>
              </div>
            )}
            
            {visibleSections.numbers && (
              <div className="section">
                <h3>Numbers:</h3>
                <pre>
                  [
                  {response.numbers && response.numbers.map((num, index) => (
                    <div key={index}>  "{num}"{index < response.numbers.length - 1 ? ',' : ''}</div>
                  ))}
                  ]
                </pre>
              </div>
            )}
            
            {visibleSections.highestAlphabet && (
              <div className="section">
                <h3>Highest Alphabet:</h3>
                <pre>
                  [
                  {response.highest_alphabet && response.highest_alphabet.map((char, index) => (
                    <div key={index}>  "{char}"{index < response.highest_alphabet.length - 1 ? ',' : ''}</div>
                  ))}
                  ]
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;