import React from 'react';
import './ConsensusSummary.css';

const ConsensusSummary = ({ results }) => {
  if (!results || !results.consensus) return null;

  const { consensus, averages } = results;
  const improvementNeeded = consensus.totalEvals - consensus.optimalVotes;

  const getRecommendationIcon = () => {
    if (consensus.optimalVotes > improvementNeeded) {
      return '✅';
    } else if (consensus.optimalVotes === improvementNeeded) {
      return '⚖️';
    } else {
      return '🔧';
    }
  };

  const getRecommendationText = () => {
    if (consensus.primaryConcerns && Array.isArray(consensus.primaryConcerns)) {
      return `Primary concerns: ${consensus.primaryConcerns.join(', ')}`;
    }
    if (consensus.summary) {
      return consensus.summary;
    }
    if (consensus.notes) {
      return consensus.notes;
    }

    const score = results.finalScore || averages.overallScore;
    if (score >= 80) {
      return "Your code is in great shape! Most evaluators agree it's well-written.";
    } else if (score >= 60) {
      return "Your code is decent, but there's room for improvement.";
    } else if (score >= 40) {
      return "Your code needs some work. Consider the suggestions below.";
    } else {
      return "Your code requires significant improvements for best practices.";
    }
  };

  const getOverallGrade = () => {
    const score = results.finalScore || averages.overallScore;
    if (score >= 90) return { grade: 'A', color: '#28a745' };
    if (score >= 80) return { grade: 'B', color: '#17a2b8' };
    if (score >= 70) return { grade: 'C', color: '#ffc107' };
    if (score >= 60) return { grade: 'D', color: '#fd7e14' };
    return { grade: 'F', color: '#dc3545' };
  };

  const overallGrade = getOverallGrade();

  return (
    <div className="consensus-summary">
      <div className="summary-header">
        <div className="grade-circle" style={{ borderColor: overallGrade.color }}>
          <span className="grade-letter" style={{ color: overallGrade.color }}>
            {overallGrade.grade}
          </span>
        </div>
        <div className="summary-content">
          <h2>Evaluation Summary</h2>
          <p className="recommendation-text">{getRecommendationText()}</p>
        </div>
        <div className="recommendation-icon">
          {getRecommendationIcon()}
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-card consensus">
          <div className="stat-icon">{(consensus.agree || consensus.agreed || consensus.agreement) ? '✅' : '❌'}</div>
          <div className="stat-info">
            <div className="stat-number">{(consensus.agree || consensus.agreed || consensus.agreement) ? 'Yes' : 'No'}</div>
            <div className="stat-label">Reviewers Agree</div>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-number">{results.evalCount || 0}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
        </div>

        <div className="stat-card average-score">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <div className="stat-number">{averages.overallScore?.toFixed(1)}</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>

        {results.issueSummary && (
          <>
            <div className="stat-card errors">
              <div className="stat-icon">🚨</div>
              <div className="stat-info">
                <div className="stat-number">{results.issueSummary.bySeverity?.high || results.issueSummary.high || 0}</div>
                <div className="stat-label">High Severity</div>
              </div>
            </div>

            <div className="stat-card warnings">
              <div className="stat-icon">⚠️</div>
              <div className="stat-info">
                <div className="stat-number">{results.issueSummary.bySeverity?.medium || results.issueSummary.medium || 0}</div>
                <div className="stat-label">Medium Severity</div>
              </div>
            </div>

            <div className="stat-card info">
              <div className="stat-icon">💡</div>
              <div className="stat-info">
                <div className="stat-number">{results.issueSummary.bySeverity?.low || results.issueSummary.low || 0}</div>
                <div className="stat-label">Low Severity</div>
              </div>
            </div>

            <div className="stat-card total-issues">
              <div className="stat-icon">🔧</div>
              <div className="stat-info">
                <div className="stat-number">{results.issueSummary.total || 0}</div>
                <div className="stat-label">Total Issues</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="score-breakdown">
        <h3>Score Breakdown</h3>
        <div className="breakdown-items">
          <div className="breakdown-item">
            <span className="breakdown-label">Code Style</span>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill style"
                style={{ width: `${averages.styleScore}%` }}
              ></div>
              <span className="breakdown-value">{averages.styleScore?.toFixed(1)}</span>
            </div>
          </div>

          <div className="breakdown-item">
            <span className="breakdown-label">Performance</span>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill performance"
                style={{ width: `${averages.performanceScore}%` }}
              ></div>
              <span className="breakdown-value">{averages.performanceScore?.toFixed(1)}</span>
            </div>
          </div>

          <div className="breakdown-item">
            <span className="breakdown-label">Security</span>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill security"
                style={{ width: `${averages.securityScore}%` }}
              ></div>
              <span className="breakdown-value">{averages.securityScore?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsensusSummary;