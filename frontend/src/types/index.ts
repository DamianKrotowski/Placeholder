export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expectedResult: string;
  status: 'pending' | 'passed' | 'failed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

export interface TestRun {
  id: string;
  testCaseId: string;
  executedBy: string;
  status: 'passed' | 'failed';
  actualResult: string;
  notes?: string;
  executedAt: Date;
  duration?: number;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: string[];
  createdAt: Date;
  updatedAt: Date;
}
