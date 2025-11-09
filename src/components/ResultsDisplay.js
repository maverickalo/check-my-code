import React from 'react';
import ScoreVisualization from './ScoreVisualization';
import ConsensusSummary from './ConsensusSummary';
import SuggestionsDisplay from './SuggestionsDisplay';
import IssuesDisplay from './IssuesDisplay';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="results-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Evaluating your code with multiple LLMs...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  if (results.error) {
    return (
      <div className="results-container">
        <div className="error">
          <h3>Error</h3>
          {results.corsError ? (
            <div>
              <p>CORS Policy Blocking Request</p>
              <div className="cors-help">
                <h4>Solutions:</h4>
                <ol>
                  <li><strong>Add CORS headers to your n8n workflow:</strong><br/>
                    Add a "Set" node with:<br/>
                    <code>Access-Control-Allow-Origin: *</code><br/>
                    <code>Access-Control-Allow-Methods: POST, OPTIONS</code><br/>
                    <code>Access-Control-Allow-Headers: Content-Type</code>
                  </li>
                  <li><strong>Use a proxy:</strong> Deploy a simple proxy server</li>
                  <li><strong>Test with curl:</strong><br/>
                    <code>curl -X POST https://primary-production-809b9.up.railway.app/webhook-test/eval -H "Content-Type: application/json" -d '{"{\"code\": \"console.log(\\\"test\\\")\"}"}' </code>
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <p>{results.error}</p>
          )}
        </div>
      </div>
    );
  }

  const formatEvaluation = (evaluation) => {
    if (typeof evaluation === 'string') {
      return evaluation;
    }

    if (evaluation && typeof evaluation === 'object') {
      return JSON.stringify(evaluation, null, 2);
    }

    return 'No evaluation data available';
  };

  const getScoreColor = (score) => {
    if (typeof score === 'number') {
      if (score >= 8) return 'excellent';
      if (score >= 6) return 'good';
      if (score >= 4) return 'average';
      return 'poor';
    }
    return 'unknown';
  };

  return (
    <div className="results-container">
      <h2>Evaluation Results</h2>

      {/* Consensus Summary */}
      <ConsensusSummary results={results} />

      {/* Score Visualization */}
      <ScoreVisualization results={results} />

      {/* Suggestions Display */}
      <SuggestionsDisplay suggestions={results.suggestions} />

      {/* Issues Display */}
      <IssuesDisplay issues={results.issues} issueSummary={results.issueSummary} />

      {/* Individual Evaluations */}
      {results.evals && Array.isArray(results.evals) ? (
        <div className="evaluations-section">
          <h3>Individual LLM Evaluations</h3>
          <div className="evaluations">
            {results.evals.map((evaluation, index) => (
              <div key={index} className="evaluation-card">
                <div className="evaluation-header">
                  <h4>Review by {evaluation.reviewer || `Reviewer ${index + 1}`}</h4>
                  <div className="score-display">
                    <div className={`score-circle ${getScoreColor(evaluation.score)}`}>
                      <span className="score-number">{evaluation.score}</span>
                      <span className="score-max">/10</span>
                    </div>
                  </div>
                </div>

                <div className="evaluation-content">
                  {(evaluation.notes || evaluation.comments) && (
                    <div className="review-notes">
                      <h5>Review Notes</h5>
                      <p>{evaluation.notes || evaluation.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="raw-results">
          <h3>Raw Results</h3>
          <pre>{formatEvaluation(results)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;