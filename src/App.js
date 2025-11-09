import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import ResultsDisplay from './components/ResultsDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCodeEvaluation = async (code) => {
    setLoading(true);
    setResults(null);

    try {
      // Ensure code is a string and not empty
      const codeString = typeof code === 'string' ? code.trim() : String(code).trim();

      if (!codeString) {
        throw new Error('Please provide some code to evaluate');
      }

      console.log('Sending code to API:', codeString.substring(0, 100) + '...'); // Debug log

      const apiUrl = process.env.REACT_APP_API_URL || 'https://primary-production-809b9.up.railway.app/webhook/eval';
      const requestBody = { code: codeString };

      console.log('Request body:', requestBody); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Parse the actual evaluation from the wrapped response
      let evaluationData = data;

      // Check if response is wrapped in output array structure
      if (data.output && Array.isArray(data.output) && data.output.length > 0) {
        const outputItem = data.output[0];
        if (outputItem.content && Array.isArray(outputItem.content) && outputItem.content.length > 0) {
          const contentItem = outputItem.content[0];
          if (contentItem.text) {
            try {
              evaluationData = JSON.parse(contentItem.text);
            } catch (parseError) {
              console.error('Error parsing evaluation text:', parseError);
            }
          }
        }
      }

      setResults(evaluationData);
    } catch (error) {
      console.error('Error evaluating code:', error);

      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.message.includes('fetch')) {
        setResults({
          error: 'CORS error: The API doesn\'t allow browser requests. You can either:\n\n1. Add CORS headers to your n8n workflow\n2. Use a proxy server\n3. Test directly with curl/Postman',
          corsError: true
        });
      } else {
        setResults({
          error: `Failed to evaluate code: ${error.message}`,
          corsError: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CheckMyCode</h1>
        <p>Evaluate your code snippets using multiple LLMs</p>
      </header>

      <main className="App-main">
        <CodeInput
          onEvaluate={handleCodeEvaluation}
          loading={loading}
        />

        {(loading || results) && (
          <ResultsDisplay
            results={results}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

export default App;