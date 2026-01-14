import axios from 'axios';
import { TestCase, TestRun, TestSuite } from '../types';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const testService = {
  // Test Cases
  getAllTestCases: async (): Promise<TestCase[]> => {
    const response = await api.get('/tests/cases');
    return response.data;
  },

  getTestCaseById: async (id: string): Promise<TestCase> => {
    const response = await api.get(`/tests/cases/${id}`);
    return response.data;
  },

  createTestCase: async (testCase: Omit<TestCase, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<TestCase> => {
    const response = await api.post('/tests/cases', testCase);
    return response.data;
  },

  updateTestCase: async (id: string, testCase: Partial<TestCase>): Promise<TestCase> => {
    const response = await api.put(`/tests/cases/${id}`, testCase);
    return response.data;
  },

  deleteTestCase: async (id: string): Promise<void> => {
    await api.delete(`/tests/cases/${id}`);
  },

  // Test Runs
  createTestRun: async (testRun: Omit<TestRun, 'id' | 'executedAt'>): Promise<TestRun> => {
    const response = await api.post('/tests/runs', testRun);
    return response.data;
  },

  getTestRuns: async (testCaseId?: string): Promise<TestRun[]> => {
    const url = testCaseId ? `/tests/runs?testCaseId=${testCaseId}` : '/tests/runs';
    const response = await api.get(url);
    return response.data;
  },

  // Test Suites
  getAllTestSuites: async (): Promise<TestSuite[]> => {
    const response = await api.get('/tests/suites');
    return response.data;
  },

  getTestSuiteById: async (id: string): Promise<TestSuite> => {
    const response = await api.get(`/tests/suites/${id}`);
    return response.data;
  },

  createTestSuite: async (suite: Omit<TestSuite, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestSuite> => {
    const response = await api.post('/tests/suites', suite);
    return response.data;
  }
};

export default api;
