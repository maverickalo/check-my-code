import React from 'react';
import './SuggestionsDisplay.css';

const SuggestionsDisplay = ({ suggestions }) => {
  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <h3>💡 Key Improvement Suggestions</h3>
        <div className="suggestions-count">
          {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-card">
            <div className="suggestion-number">
              {index + 1}
            </div>
            <div className="suggestion-content">
              <p>{suggestion}</p>
            </div>
            <div className="suggestion-icon">
              {getSuggestionIcon(suggestion)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getSuggestionIcon = (suggestion) => {
  const text = suggestion.toLowerCase();

  if (text.includes('naming') || text.includes('variable')) return '🏷️';
  if (text.includes('error') || text.includes('handling')) return '🛡️';
  if (text.includes('performance') || text.includes('optimize')) return '⚡';
  if (text.includes('security') || text.includes('validation')) return '🔒';
  if (text.includes('comment') || text.includes('documentation')) return '📝';
  if (text.includes('middleware')) return '⚙️';
  if (text.includes('database') || text.includes('sql')) return '🗄️';
  if (text.includes('rate') || text.includes('limiting')) return '🚦';
  if (text.includes('pagination')) return '📄';
  if (text.includes('input') || text.includes('sanitize')) return '🧹';

  return '🔧';
};

export default SuggestionsDisplay;