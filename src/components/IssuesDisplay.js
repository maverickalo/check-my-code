import React, { useState } from 'react';
import './IssuesDisplay.css';

const IssuesDisplay = ({ issues, issueSummary }) => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!issues || !Array.isArray(issues) || issues.length === 0) {
    return null;
  }

  // Filter issues based on selected filters
  const filteredIssues = issues.filter(issue => {
    const severityMatch = selectedSeverity === 'all' || issue.severity === selectedSeverity;
    const categoryMatch = selectedCategory === 'all' || issue.category === selectedCategory;
    return severityMatch && categoryMatch;
  });

  // Get unique categories and severities for filters
  const categories = [...new Set(issues.map(issue => issue.category))];
  const severities = [...new Set(issues.map(issue => issue.severity))];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '💡';
      default: return '💡';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'security': return '🔒';
      case 'performance': return '⚡';
      case 'style': return '🎨';
      case 'correctness': return '✅';
      case 'error_handling': return '🛡️';
      default: return '🔧';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#17a2b8';
      default: return '#17a2b8';
    }
  };

  return (
    <div className="issues-container">
      <div className="issues-header">
        <div className="header-content">
          <h3>🔍 Code Issues Analysis</h3>
          <div className="issue-stats">
            <div className="stat-item error">
              <span className="stat-number">{issueSummary?.bySeverity?.high || issueSummary?.high || 0}</span>
              <span className="stat-label">High</span>
            </div>
            <div className="stat-item warning">
              <span className="stat-number">{issueSummary?.bySeverity?.medium || issueSummary?.medium || 0}</span>
              <span className="stat-label">Medium</span>
            </div>
            <div className="stat-item info">
              <span className="stat-number">{issueSummary?.bySeverity?.low || issueSummary?.low || 0}</span>
              <span className="stat-label">Low</span>
            </div>
            <div className="stat-item total">
              <span className="stat-number">{issueSummary?.total || 0}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>

        <div className="issues-filters">
          <div className="filter-group">
            <label>Severity:</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">All</option>
              {severities.map(severity => (
                <option key={severity} value={severity}>
                  {getSeverityIcon(severity)} {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="issues-grid">
        {filteredIssues.length === 0 ? (
          <div className="no-issues">
            <p>No issues found matching the selected filters.</p>
          </div>
        ) : (
          filteredIssues.map((issue, index) => (
            <div
              key={index}
              className={`issue-card ${issue.severity}`}
              style={{ borderLeftColor: getSeverityColor(issue.severity) }}
            >
              <div className="issue-header">
                <div className="issue-meta">
                  <span className="severity-badge" style={{ backgroundColor: getSeverityColor(issue.severity) }}>
                    {getSeverityIcon(issue.severity)} {issue.severity}
                  </span>
                  <span className="category-badge">
                    {getCategoryIcon(issue.category)} {issue.category}
                  </span>
                </div>
                {(issue.line || issue.column) && (
                  <div className="location-info">
                    {issue.line && <span>Line {issue.line}</span>}
                    {issue.column && <span>Col {issue.column}</span>}
                  </div>
                )}
              </div>

              <div className="issue-content">
                <div className="issue-message">
                  <p>{issue.message}</p>
                </div>

                {issue.codeSnippet && (
                  <div className="code-snippets">
                    <div className="code-snippet-section">
                      <h5>🔍 Current Code:</h5>
                      <pre className="code-snippet current">{issue.codeSnippet}</pre>
                    </div>

                    {issue.fixedSnippet && (
                      <div className="code-snippet-section">
                        <h5>✅ Suggested Fix:</h5>
                        <pre className="code-snippet fixed">{issue.fixedSnippet}</pre>
                      </div>
                    )}
                  </div>
                )}

                {issue.suggestedFix && (
                  <div className="suggested-fix">
                    <h5>💡 Fix Description:</h5>
                    <p>{issue.suggestedFix}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {filteredIssues.length < issues.length && (
        <div className="filter-info">
          Showing {filteredIssues.length} of {issues.length} issues
        </div>
      )}
    </div>
  );
};

export default IssuesDisplay;