import { Routes, Route, Navigate, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResultPage from './pages/ResultsPage.jsx';
import DetailPage from './pages/DetailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <>
      {/*
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/search" style={{ marginRight: '1rem' }}>Search</Link>
        <Link to="/contact" style={{ marginRight: '1rem' }}>Contact</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/surprise">Surprise Me</Link>
      </nav>
      */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
