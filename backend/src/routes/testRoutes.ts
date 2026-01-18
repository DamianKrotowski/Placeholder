import { Router } from 'express';
import {
  getAllTestCases,
  getTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  createTestRun,
  getTestRuns,
  getAllTestSuites,
  createTestSuite,
  getTestSuiteById
} from '../controllers/testController';

const router = Router();

// Test Cases
router.get('/cases', getAllTestCases);
router.get('/cases/:id', getTestCaseById);
router.post('/cases', createTestCase);
router.put('/cases/:id', updateTestCase);
router.delete('/cases/:id', deleteTestCase);

// Test Runs
router.post('/runs', createTestRun);
router.get('/runs', getTestRuns);

// Test Suites
router.get('/suites', getAllTestSuites);
router.get('/suites/:id', getTestSuiteById);
router.post('/suites', createTestSuite);

export default router;
