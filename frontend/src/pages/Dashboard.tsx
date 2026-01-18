import { useState, useEffect } from 'react';
import { testService } from '../services/api';
import { TestCase } from '../types';
import './Dashboard.css';

const Dashboard = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestCases();
  }, []);

  const loadTestCases = async () => {
    try {
      const data = await testService.getAllTestCases();
      setTestCases(data);
    } catch (error) {
      console.error('Failed to load test cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: testCases.length,
    passed: testCases.filter(tc => tc.status === 'passed').length,
    failed: testCases.filter(tc => tc.status === 'failed').length,
    pending: testCases.filter(tc => tc.status === 'pending').length,
    blocked: testCases.filter(tc => tc.status === 'blocked').length
  };

  const passRate = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : '0';

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <h1 className="page-title">Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Test Cases</div>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.passed}</div>
              <div className="stat-label">Passed</div>
            </div>
          </div>

          <div className="stat-card stat-danger">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-value">{stats.failed}</div>
              <div className="stat-label">Failed</div>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Pass Rate</h2>
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${passRate}%` }}
              ></div>
            </div>
            <div className="progress-text">{passRate}%</div>
          </div>
        </div>

        {stats.total === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No test cases yet</h3>
            <p>Get started by creating your first test case</p>
            <a href="/test-cases" className="btn btn-primary">Create Test Case</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
