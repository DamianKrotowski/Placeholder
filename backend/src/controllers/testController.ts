import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TestCase, TestRun, TestSuite } from '../models/types';

// In-memory storage (replace with database in production)
let testCases: TestCase[] = [];
let testRuns: TestRun[] = [];
let testSuites: TestSuite[] = [];

// Test Cases
export const getAllTestCases = (req: Request, res: Response) => {
  res.json(testCases);
};

export const getTestCaseById = (req: Request, res: Response) => {
  const testCase = testCases.find(tc => tc.id === req.params.id);
  if (!testCase) {
    return res.status(404).json({ error: 'Test case not found' });
  }
  res.json(testCase);
};

export const createTestCase = (req: Request, res: Response) => {
  const { title, description, steps, expectedResult, priority } = req.body;
  
  if (!title || !description || !expectedResult) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newTestCase: TestCase = {
    id: uuidv4(),
    title,
    description,
    steps: steps || [],
    expectedResult,
    status: 'pending',
    priority: priority || 'medium',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  testCases.push(newTestCase);
  res.status(201).json(newTestCase);
};

export const updateTestCase = (req: Request, res: Response) => {
  const index = testCases.findIndex(tc => tc.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Test case not found' });
  }

  const updatedTestCase = {
    ...testCases[index],
    ...req.body,
    id: testCases[index].id,
    updatedAt: new Date()
  };

  testCases[index] = updatedTestCase;
  res.json(updatedTestCase);
};

export const deleteTestCase = (req: Request, res: Response) => {
  const index = testCases.findIndex(tc => tc.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Test case not found' });
  }

  testCases.splice(index, 1);
  res.status(204).send();
};

// Test Runs
export const createTestRun = (req: Request, res: Response) => {
  const { testCaseId, executedBy, status, actualResult, notes, duration } = req.body;

  if (!testCaseId || !executedBy || !status || !actualResult) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const testCase = testCases.find(tc => tc.id === testCaseId);
  if (!testCase) {
    return res.status(404).json({ error: 'Test case not found' });
  }

  const newTestRun: TestRun = {
    id: uuidv4(),
    testCaseId,
    executedBy,
    status,
    actualResult,
    notes,
    duration,
    executedAt: new Date()
  };

  testRuns.push(newTestRun);

  // Update test case status
  const testCaseIndex = testCases.findIndex(tc => tc.id === testCaseId);
  if (testCaseIndex !== -1) {
    testCases[testCaseIndex].status = status;
    testCases[testCaseIndex].updatedAt = new Date();
  }

  res.status(201).json(newTestRun);
};

export const getTestRuns = (req: Request, res: Response) => {
  const { testCaseId } = req.query;
  
  if (testCaseId) {
    const runs = testRuns.filter(tr => tr.testCaseId === testCaseId);
    return res.json(runs);
  }
  
  res.json(testRuns);
};

// Test Suites
export const getAllTestSuites = (req: Request, res: Response) => {
  res.json(testSuites);
};

export const createTestSuite = (req: Request, res: Response) => {
  const { name, description, testCases: testCaseIds } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newTestSuite: TestSuite = {
    id: uuidv4(),
    name,
    description: description || '',
    testCases: testCaseIds || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  testSuites.push(newTestSuite);
  res.status(201).json(newTestSuite);
};

export const getTestSuiteById = (req: Request, res: Response) => {
  const suite = testSuites.find(ts => ts.id === req.params.id);
  if (!suite) {
    return res.status(404).json({ error: 'Test suite not found' });
  }
  res.json(suite);
};
