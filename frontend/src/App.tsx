import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TestCases from './pages/TestCases';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/test-cases" element={<TestCases />} />
          <Route path="/test-suites" element={<div className="container"><h1>Test Suites (Coming Soon)</h1></div>} />
          <Route path="/test-runs" element={<div className="container"><h1>Test Runs (Coming Soon)</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
