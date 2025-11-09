import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './ScoreVisualization.css';

const ScoreVisualization = ({ results }) => {
  if (!results || !results.averages) return null;

  const averageData = [
    { name: 'Style', score: results.averages.styleScore, fullName: 'Code Style' },
    { name: 'Performance', score: results.averages.performanceScore, fullName: 'Performance' },
    { name: 'Security', score: results.averages.securityScore, fullName: 'Security' },
    { name: 'Overall', score: results.averages.overallScore, fullName: 'Overall Score' }
  ];

  const radarData = averageData.slice(0, 3); // Exclude overall for radar

  const consensusData = [
    {
      name: 'Needs Improvement',
      value: results.consensus?.totalEvals - results.consensus?.optimalVotes || 0,
      color: '#ff6b6b'
    },
    {
      name: 'Optimal',
      value: results.consensus?.optimalVotes || 0,
      color: '#51cf66'
    }
  ];

  const getBarColor = (score) => {
    if (score >= 90) return '#51cf66';
    if (score >= 80) return '#69db7c';
    if (score >= 70) return '#ffd43b';
    if (score >= 60) return '#ff8787';
    return '#ff6b6b';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}: ${payload[0].value.toFixed(1)}/100`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomRadarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}: ${payload[0].value.toFixed(1)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="score-visualization">
      <div className="charts-grid">

        {/* Average Scores Bar Chart */}
        <div className="chart-container">
          <h3>Average Scores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={averageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="score"
                radius={[4, 4, 0, 0]}
                fill={(entry) => getBarColor(entry?.score || 0)}
              >
                {averageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="chart-container">
          <h3>Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <PolarGrid gridType="polygon" stroke="#f0f0f0" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#666' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#666' }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#667eea"
                fill="#667eea"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Consensus Pie Chart */}
        <div className="chart-container">
          <h3>LLM Consensus</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={consensusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, percent }) =>
                  value > 0 ? `${name}: ${value} (${(percent * 100).toFixed(0)}%)` : null
                }
                labelLine={false}
              >
                {consensusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} evaluations`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="consensus-stats">
            <div className="stat">
              <span className="stat-label">Agreement:</span>
              <span className="stat-value">{results.consensus?.agreementPct?.toFixed(1)}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Evaluations:</span>
              <span className="stat-value">{results.consensus?.totalEvals}</span>
            </div>
          </div>
        </div>

        {/* Overall Score Display */}
        <div className="chart-container overall-score-display">
          <h3>Final Score</h3>
          <div className="score-circle">
            <div className="score-number">
              {(results.finalScore || results.averages.overallScore)?.toFixed(1)}
            </div>
            <div className="score-label">/ 100</div>
          </div>
          <div className="score-description">
            {((results.finalScore || results.averages.overallScore) >= 90) && <span className="excellent">Excellent Code!</span>}
            {((results.finalScore || results.averages.overallScore) >= 80) && ((results.finalScore || results.averages.overallScore) < 90) && <span className="good">Good Code</span>}
            {((results.finalScore || results.averages.overallScore) >= 70) && ((results.finalScore || results.averages.overallScore) < 80) && <span className="average">Average Code</span>}
            {((results.finalScore || results.averages.overallScore) >= 60) && ((results.finalScore || results.averages.overallScore) < 70) && <span className="below-average">Below Average</span>}
            {((results.finalScore || results.averages.overallScore) < 60) && <span className="poor">Needs Improvement</span>}
          </div>
          <div className="final-recommendation">
            <span className={`recommendation-badge ${results.finalRecommendation || results.consensus?.recommendation}`}>
              {(results.finalRecommendation || results.consensus?.recommendation) === 'optimal' ? '✅ Optimal' : '🔧 Needs Improvement'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreVisualization;