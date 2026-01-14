import { useState, useEffect } from 'react';
import { testService } from '../services/api';
import { TestCase } from '../types';
import './TestCases.css';

const TestCases = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    expectedResult: '',
    priority: 'medium' as const
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const steps = formData.steps.split('\n').filter(s => s.trim());
      await testService.createTestCase({
        title: formData.title,
        description: formData.description,
        steps,
        expectedResult: formData.expectedResult,
        priority: formData.priority
      });
      setFormData({
        title: '',
        description: '',
        steps: '',
        expectedResult: '',
        priority: 'medium'
      });
      setShowForm(false);
      loadTestCases();
    } catch (error) {
      console.error('Failed to create test case:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this test case?')) {
      try {
        await testService.deleteTestCase(id);
        loadTestCases();
      } catch (error) {
        console.error('Failed to delete test case:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="test-cases-page">
        <div className="page-header">
          <h1 className="page-title">Test Cases</h1>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ New Test Case'}
          </button>
        </div>

        {showForm && (
          <div className="card form-card">
            <h2 className="card-title">Create New Test Case</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Steps (one per line)</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={formData.steps}
                  onChange={e => setFormData({ ...formData, steps: e.target.value })}
                  placeholder="Step 1&#10;Step 2&#10;Step 3"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Result *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.expectedResult}
                  onChange={e => setFormData({ ...formData, expectedResult: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Create Test Case
              </button>
            </form>
          </div>
        )}

        <div className="test-cases-list">
          {testCases.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No test cases yet</h3>
              <p>Create your first test case to get started</p>
            </div>
          ) : (
            testCases.map(testCase => (
              <div key={testCase.id} className="test-case-card">
                <div className="test-case-header">
                  <div>
                    <h3 className="test-case-title">{testCase.title}</h3>
                    <div className="test-case-badges">
                      <span className={`badge badge-${testCase.status}`}>
                        {testCase.status}
                      </span>
                      <span className={`badge badge-${testCase.priority}`}>
                        {testCase.priority}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(testCase.id)}
                  >
                    Delete
                  </button>
                </div>
                <p className="test-case-description">{testCase.description}</p>
                {testCase.steps.length > 0 && (
                  <div className="test-case-steps">
                    <strong>Steps:</strong>
                    <ol>
                      {testCase.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="test-case-expected">
                  <strong>Expected Result:</strong> {testCase.expectedResult}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCases;
