import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
            setResponse(null);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!response) return null;

        let filteredResponse = { ...response }; // Copy response object to avoid mutation
        if (!selectedOptions.length) return filteredResponse; // Show all options if nothing selected

        filteredResponse = selectedOptions.reduce((acc, option) => {
            switch (option) {
                case 'Alphabets':
                    acc.alphabets = response.alphabets;
                    break;
                case 'Numbers':
                    acc.numbers = response.numbers;
                    break;
                case 'Highest lowercase alphabet':
                    acc.highest_lowercase = response.highest_lowercase;
                    break;
            }
            return acc;
        }, {});

        return (
            <div>
                <h3>Response:</h3>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <h1>Your_Roll_Number</h1>
            <input
                type="text"
                value={jsonInput}
                onChange={handleInputChange}
                placeholder='Enter JSON input'
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <label>Select Options:</label>
                    <select multiple onChange={handleOptionChange} value={selectedOptions}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;