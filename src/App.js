import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const res = await axios.post('https://bfhl-backend-bu7d.onrender.com/bfhl', parsed);
      setResponse(res.data);
    } catch (err) {
      alert('Invalid JSON or server error');
      console.error(err);
    }
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>BFHL Fullstack App</h1>

      <textarea
        rows={4}
        cols={60}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON like: { "data": ["A", "1", "B"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <h2>Toggle Sections</h2>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleSection('alphabets')}
              checked={visibleSections.includes('alphabets')}
            /> Characters
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleSection('numbers')}
              checked={visibleSections.includes('numbers')}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleSection('highest_alphabet')}
              checked={visibleSections.includes('highest_alphabet')}
            /> Highest Alphabet
          </label>

          {visibleSections.includes('alphabets') && (
            <div>
              <h3>Characters:</h3>
              <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
            </div>
          )}
          {visibleSections.includes('numbers') && (
            <div>
              <h3>Numbers:</h3>
              <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
            </div>
          )}
          {visibleSections.includes('highest_alphabet') && (
            <div>
              <h3>Highest Alphabet:</h3>
              <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
