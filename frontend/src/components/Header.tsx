import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">PlayTrace</span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/test-cases" className="nav-link">Test Cases</Link>
            <Link to="/test-suites" className="nav-link">Test Suites</Link>
            <Link to="/test-runs" className="nav-link">Test Runs</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
