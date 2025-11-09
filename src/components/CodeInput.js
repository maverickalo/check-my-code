import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeInput.css';

const CodeInput = ({ onEvaluate, loading }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() && !loading) {
      onEvaluate(code.trim());
    }
  };

  const handleClear = () => {
    setCode('');
    setShowPreview(false);
  };

  const languageOptions = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'c',
    'csharp',
    'go',
    'rust',
    'php',
    'ruby',
    'swift'
  ];

  return (
    <div className="code-input-container">
      <div className="code-input-header">
        <h2>Paste Your Code</h2>
        <div className="language-selector">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languageOptions.map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="code-input-form">
        <div className="input-area">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code snippet here..."
            rows={15}
            className="code-textarea"
            disabled={loading}
          />
        </div>

        <div className="controls">
          <div className="control-group">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="preview-button"
              disabled={!code.trim()}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              disabled={loading}
            >
              Clear
            </button>
          </div>

          <button
            type="submit"
            className="evaluate-button"
            disabled={!code.trim() || loading}
          >
            {loading ? 'Evaluating...' : 'Evaluate Code'}
          </button>
        </div>
      </form>

      {showPreview && code.trim() && (
        <div className="code-preview">
          <h3>Preview</h3>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeInput;